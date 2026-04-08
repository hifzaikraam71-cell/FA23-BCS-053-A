const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const stripe = require('stripe')('your-stripe-secret-key'); // Replace with actual key
const multer = require('multer');
const sharp = require('sharp');
const cron = require('node-cron');

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connect
mongoose.connect('mongodb://127.0.0.1:27017/adflow')
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// User Schema
const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
  email: String,
  role: { type: String, default: 'user' } // user or admin
});

const User = mongoose.model("User", UserSchema);

// Ad Schema
const AdSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  category: String,
  status: { type: String, default: "pending" }, // pending, approved, rejected
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  sponsored: { type: Boolean, default: false },
  price: Number,
  schedule: Date, // when to publish
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

const Ad = mongoose.model("Ad", AdSchema);

// Payment Schema
const PaymentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  ad: { type: mongoose.Schema.Types.ObjectId, ref: 'Ad' },
  amount: Number,
  status: String, // success, failed
  stripeId: String
});

const Payment = mongoose.model("Payment", PaymentSchema);

// Middleware for auth
const auth = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).send('Access denied');
  try {
    const verified = jwt.verify(token, 'secretkey');
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send('Invalid token');
  }
};

// Multer for file upload
const upload = multer({ dest: 'uploads/' });

// Routes

// Register
app.post('/register', async (req, res) => {
  const { username, password, email } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = new User({ username, password: hashedPassword, email });
  await user.save();
  res.send({ message: 'User registered' });
});

// Create Admin (for setup)
app.post('/createadmin', async (req, res) => {
  const { username, password, email } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = new User({ username, password: hashedPassword, email, role: 'admin' });
  await user.save();
  res.send({ message: 'Admin created' });
});

// Login (demo-friendly: accept any email/username)
app.post('/login', async (req, res) => {
  const { identifier, password } = req.body;
  if (!identifier) return res.status(400).send('Identifier required');

  let user = await User.findOne({ $or: [{ username: identifier }, { email: identifier }] });

  if (!user) {
    const generatedPassword = password || 'demo123';
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(generatedPassword, salt);
    const username = identifier.includes('@') ? identifier.split('@')[0] : identifier;
    user = new User({ username, email: identifier, password: hashedPassword });
    await user.save();
  }

  const token = jwt.sign({ _id: user._id, username: user.username, role: user.role }, 'secretkey');
  res.send({ token });
});

// Test
app.get('/', (req, res) => {
  res.send("Backend Working ✅");
});

// Create Ad
app.post('/ads', auth, upload.single('image'), async (req, res) => {
  const { title, description, category, sponsored, price, schedule } = req.body;
  let image = '';
  if (req.file) {
    // Normalize image
    const buffer = await sharp(req.file.path).resize(500, 500).jpeg().toBuffer();
    image = buffer.toString('base64'); // or save to file
  }
  const newAd = new Ad({
    title,
    description,
    image,
    category,
    user: req.user._id,
    sponsored: sponsored === 'true',
    price: parseFloat(price),
    schedule: schedule ? new Date(schedule) : null
  });
  await newAd.save();
  res.send(newAd);
});

// Get Ads
app.get('/ads', async (req, res) => {
  const ads = await Ad.find({ status: "approved" }).populate('user', 'username');
  res.send(ads);
});

// Get Ad by ID
app.get('/ads/:id', async (req, res) => {
  const ad = await Ad.findById(req.params.id).populate('user', 'username');
  if (!ad) return res.status(404).send('Ad not found');
  res.send(ad);
});

// Get My Ads
app.get('/myads', auth, async (req, res) => {
  const ads = await Ad.find({ user: req.user._id });
  res.send(ads);
});

// Admin: list all ads for moderation
app.get('/admin/ads', auth, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).send('Access denied');
  const ads = await Ad.find().populate('user', 'username');
  res.send(ads);
});

// Moderate Ad (Admin only)
app.put('/ads/:id/moderate', auth, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).send('Access denied');
  const { status } = req.body;
  const ad = await Ad.findByIdAndUpdate(req.params.id, { status }, { new: true });
  res.send(ad);
});

// Pay for Ad
app.post('/pay', auth, async (req, res) => {
  const { adId, token } = req.body;
  const ad = await Ad.findById(adId);
  if (!ad) return res.status(404).send('Ad not found');
  try {
    const charge = await stripe.charges.create({
      amount: ad.price * 100, // cents
      currency: 'usd',
      source: token,
      description: `Payment for ad: ${ad.title}`
    });
    const payment = new Payment({
      user: req.user._id,
      ad: adId,
      amount: ad.price,
      status: 'success',
      stripeId: charge.id
    });
    await payment.save();
    ad.sponsored = true;
    await ad.save();
    res.send({ message: 'Payment successful' });
  } catch (err) {
    res.status(500).send('Payment failed');
  }
});

// Analytics
app.get('/analytics', auth, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).send('Access denied');
  const totalAds = await Ad.countDocuments();
  const approvedAds = await Ad.countDocuments({ status: 'approved' });
  const sponsoredAds = await Ad.countDocuments({ sponsored: true });
  const totalViews = await Ad.aggregate([{ $group: { _id: null, total: { $sum: '$views' } } }]);
  res.send({
    totalAds,
    approvedAds,
    sponsoredAds,
    totalViews: totalViews[0]?.total || 0
  });
});

// Increment view
app.post('/ads/:id/view', async (req, res) => {
  await Ad.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } });
  res.send({ message: 'View incremented' });
});

// Cron for scheduling
cron.schedule('* * * * *', async () => { // every minute
  const now = new Date();
  await Ad.updateMany(
    { schedule: { $lte: now }, status: 'pending' },
    { status: 'approved' }
  );
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});