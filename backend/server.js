const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const stripe = require('stripe')('sk_test_your_key_here');
const multer = require('multer');
const sharp = require('sharp');
const cron = require('node-cron');
const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5000', /\.vercel\.app$/, /\.vercel\.app$/],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ limit: '50mb' }));
app.use('/uploads', express.static('uploads'));

// Database Configuration
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, 'database.sqlite'),
  logging: false,
});

// Multer Configuration for Ad Images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// ===== DATABASE MODELS =====

// User Model
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('user', 'admin', 'moderator'),
    defaultValue: 'user',
  },
  profileImage: DataTypes.STRING,
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: true,
  tableName: 'users',
});

// Category Model
const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  slug: {
    type: DataTypes.STRING,
    unique: true,
  },
  description: DataTypes.TEXT,
  icon: DataTypes.STRING,
}, {
  timestamps: true,
  tableName: 'categories',
});

// City Model
const City = sequelize.define('City', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  slug: {
    type: DataTypes.STRING,
    unique: true,
  },
  country: DataTypes.STRING,
}, {
  timestamps: true,
  tableName: 'cities',
});

// Package Model
const Package = sequelize.define('Package', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  duration: DataTypes.INTEGER, // in days
  features: DataTypes.JSON,
  visibility: {
    type: DataTypes.ENUM('standard', 'premium', 'featured'),
    defaultValue: 'standard',
  },
}, {
  timestamps: true,
  tableName: 'packages',
});

// Ad Model
const Ad = sequelize.define('Ad', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: DataTypes.TEXT,
  image: DataTypes.STRING,
  images: DataTypes.JSON,
  price: DataTypes.DECIMAL(10, 2),
  status: {
    type: DataTypes.ENUM('pending', 'approved', 'rejected', 'published', 'archived', 'sold'),
    defaultValue: 'pending',
  },
  sponsored: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  views: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  schedule: DataTypes.DATE,
  expiryDate: DataTypes.DATE,
  publishedAt: DataTypes.DATE,
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
  categoryId: {
    type: DataTypes.INTEGER,
    references: {
      model: Category,
      key: 'id',
    },
  },
  cityId: {
    type: DataTypes.INTEGER,
    references: {
      model: City,
      key: 'id',
    },
  },
  packageId: {
    type: DataTypes.INTEGER,
    references: {
      model: Package,
      key: 'id',
    },
    allowNull: true,
  },
}, {
  timestamps: true,
  tableName: 'ads',
});

// Payment Model
const Payment = sequelize.define('Payment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
  adId: {
    type: DataTypes.INTEGER,
    references: {
      model: Ad,
      key: 'id',
    },
  },
  amount: DataTypes.DECIMAL(10, 2),
  currency: {
    type: DataTypes.STRING,
    defaultValue: 'USD',
  },
  status: {
    type: DataTypes.ENUM('pending', 'completed', 'failed', 'refunded'),
    defaultValue: 'pending',
  },
  transactionId: DataTypes.STRING,
  paymentMethod: DataTypes.STRING,
}, {
  timestamps: true,
  tableName: 'payments',
});

// Analytics Model
const Analytics = sequelize.define('Analytics', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  adId: {
    type: DataTypes.INTEGER,
    references: {
      model: Ad,
      key: 'id',
    },
  },
  views: DataTypes.INTEGER,
  clicks: DataTypes.INTEGER,
  impressions: DataTypes.INTEGER,
  conversions: DataTypes.INTEGER,
  date: DataTypes.DATE,
}, {
  timestamps: true,
  tableName: 'analytics',
});

// Sale Model
const Sale = sequelize.define('Sale', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  adId: {
    type: DataTypes.INTEGER,
    references: {
      model: Ad,
      key: 'id',
    },
  },
  sellerId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
  price: DataTypes.DECIMAL(10, 2),
  soldAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: true,
  tableName: 'sales',
});

// ===== DATABASE ASSOCIATIONS =====

User.hasMany(Ad, { foreignKey: 'userId', as: 'ads' });
Ad.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Category.hasMany(Ad, { foreignKey: 'categoryId', as: 'ads' });
Ad.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });

City.hasMany(Ad, { foreignKey: 'cityId', as: 'ads' });
Ad.belongsTo(City, { foreignKey: 'cityId', as: 'city' });

Package.hasMany(Ad, { foreignKey: 'packageId' });
Ad.belongsTo(Package, { foreignKey: 'packageId' });

User.hasMany(Payment, { foreignKey: 'userId' });
Payment.belongsTo(User, { foreignKey: 'userId' });

Ad.hasMany(Payment, { foreignKey: 'adId' });
Payment.belongsTo(Ad, { foreignKey: 'adId' });

Ad.hasMany(Analytics, { foreignKey: 'adId' });
Analytics.belongsTo(Ad, { foreignKey: 'adId' });

User.hasMany(Sale, { foreignKey: 'sellerId', as: 'sales' });
Sale.belongsTo(User, { foreignKey: 'sellerId', as: 'seller' });

Ad.hasOne(Sale, { foreignKey: 'adId', as: 'saleInfo' });
Sale.belongsTo(Ad, { foreignKey: 'adId', as: 'ad' });

// ===== JWT Authentication Middleware =====

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key_here';

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// ===== AUTH ROUTES =====

// Register
app.post('/auth/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      user: { id: user.id, username, email, role: user.role },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
});

// Login
app.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      user: { id: user.id, username: user.username, email, role: user.role },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
});


// ===== AD CRUD ROUTES =====

// Create Ad
app.post('/ads', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    console.log('Incoming Ad Data:', req.body);
    console.log('Incoming File:', req.file);

    const { title, description, price, categoryId, cityId, packageId, schedule } = req.body;

    if (!title || !categoryId || !cityId) {
      return res.status(400).json({ message: 'Title, category, and city are required' });
    }

    const adData = {
      title: title.trim(),
      description: description ? description.trim() : '',
      price: price && !isNaN(parseFloat(price)) ? parseFloat(price) : 0,
      categoryId: parseInt(categoryId),
      cityId: parseInt(cityId),
      packageId: packageId && !isNaN(parseInt(packageId)) ? parseInt(packageId) : null,
      schedule: schedule ? new Date(schedule) : null,
      userId: req.user.id,
      status: 'published',
    };

    if (req.file) {
      adData.image = req.file.path.replace(/\\/g, '/');
    }

    const ad = await Ad.create(adData);
    console.log('✅ Ad Created:', ad.id, '-', ad.title);

    res.status(201).json({
      message: 'Ad created successfully',
      ad,
    });
  } catch (error) {
    console.error('Ad Creation Error:', error);
    res.status(500).json({ 
      message: 'Failed to create ad', 
      error: error.message,
      details: error.errors ? error.errors.map((e) => e.message) : undefined
    });
  }
});

// Get All Ads (with filters)
app.get('/ads', async (req, res) => {
  try {
    const { categoryId, cityId, status, page = 1, limit = 12 } = req.query;
    const offset = (page - 1) * limit;

    const where = { status: 'published' };
    if (categoryId) where.categoryId = categoryId;
    if (cityId) where.cityId = cityId;
    if (status && status !== 'published') {
      delete where.status;
      where.status = status;
    }

    const ads = await Ad.findAndCountAll({
      where,
      include: [
        { model: User, as: 'user', attributes: ['id', 'username', 'email'] },
        { model: Category, as: 'category', attributes: ['id', 'name', 'slug'] },
        { model: City, as: 'city', attributes: ['id', 'name', 'slug'] },
      ],
      offset,
      limit: parseInt(limit),
      order: [['createdAt', 'DESC']],
    });

    res.json({
      data: ads.rows,
      total: ads.count,
      pages: Math.ceil(ads.count / limit),
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch ads', error: error.message });
  }
});

// Get Single Ad
app.get('/ads/:id', async (req, res) => {
  try {
    const ad = await Ad.findByPk(req.params.id, {
      include: [
        { model: User, as: 'user', attributes: ['id', 'username', 'email'] },
        { model: Category, as: 'category', attributes: ['id', 'name'] },
        { model: City, as: 'city', attributes: ['id', 'name'] },
        { model: Package, attributes: ['id', 'name', 'price'] },
      ],
    });

    if (!ad) {
      return res.status(404).json({ message: 'Ad not found' });
    }

    // Increment views
    ad.views += 1;
    await ad.save();

    res.json(ad);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch ad', error: error.message });
  }
});

// Update Ad
app.put('/ads/:id', authenticateToken, async (req, res) => {
  try {
    const ad = await Ad.findByPk(req.params.id);

    if (!ad) {
      return res.status(404).json({ message: 'Ad not found' });
    }

    if (ad.userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await ad.update(req.body);

    res.json({
      message: 'Ad updated successfully',
      ad,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update ad', error: error.message });
  }
});

// Delete Ad
app.delete('/ads/:id', authenticateToken, async (req, res) => {
  try {
    const ad = await Ad.findByPk(req.params.id);

    if (!ad) {
      return res.status(404).json({ message: 'Ad not found' });
    }

    if (ad.userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await ad.destroy();

    res.json({
      message: 'Ad deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete ad', error: error.message });
  }
});

// Mark Ad as Sold
app.post('/ads/:id/sell', authenticateToken, async (req, res) => {
  try {
    const ad = await Ad.findByPk(req.params.id);

    if (!ad) {
      return res.status(404).json({ message: 'Ad not found' });
    }

    if (ad.userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    if (ad.status === 'sold') {
      return res.status(400).json({ message: 'Ad is already sold' });
    }

    // Update ad status
    await ad.update({ status: 'sold' });

    // Create sale record
    const sale = await Sale.create({
      adId: ad.id,
      sellerId: req.user.id,
      price: ad.price,
    });

    res.json({
      message: 'Ad marked as sold successfully',
      sale,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to mark ad as sold', error: error.message });
  }
});

// Get Sales History
app.get('/sales/history', authenticateToken, async (req, res) => {
  try {
    const sales = await Sale.findAll({
      where: { sellerId: req.user.id },
      include: [
        { 
          model: Ad, 
          as: 'ad',
          include: [
            { model: Category, as: 'category', attributes: ['name'] },
            { model: City, as: 'city', attributes: ['name'] }
          ]
        }
      ],
      order: [['soldAt', 'DESC']],
    });

    res.json(sales);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch sales history', error: error.message });
  }
});


// ===== CATEGORY ROUTES =====

app.get('/categories', async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch categories', error: error.message });
  }
});

app.post('/categories', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can create categories' });
    }

    const { name, description } = req.body;
    const slug = name.toLowerCase().replace(/\s+/g, '-');

    const category = await Category.create({
      name,
      slug,
      description,
    });

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create category', error: error.message });
  }
});

// ===== CITY ROUTES =====

app.get('/cities', async (req, res) => {
  try {
    const cities = await City.findAll();
    res.json(cities);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch cities', error: error.message });
  }
});

app.post('/cities', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can create cities' });
    }

    const { name, country } = req.body;
    const slug = name.toLowerCase().replace(/\s+/g, '-');

    const city = await City.create({
      name,
      slug,
      country,
    });

    res.status(201).json(city);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create city', error: error.message });
  }
});

// ===== PACKAGE ROUTES =====

app.get('/packages', async (req, res) => {
  try {
    const packages = await Package.findAll();
    res.json(packages);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch packages', error: error.message });
  }
});

// ===== ANALYTICS ROUTES =====

app.get('/analytics/ad/:adId', authenticateToken, async (req, res) => {
  try {
    const ad = await Ad.findByPk(req.params.adId);

    if (!ad) {
      return res.status(404).json({ message: 'Ad not found' });
    }

    if (ad.userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const analytics = await Analytics.findAll({
      where: { adId: req.params.adId },
      order: [['date', 'DESC']],
    });

    res.json(analytics);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch analytics', error: error.message });
  }
});

// ===== PAYMENT ROUTES =====

app.post('/payments', authenticateToken, async (req, res) => {
  try {
    const { adId, amount, currency = 'USD' } = req.body;

    const ad = await Ad.findByPk(adId);
    if (!ad) {
      return res.status(404).json({ message: 'Ad not found' });
    }

    // Create payment record
    const payment = await Payment.create({
      userId: req.user.id,
      adId,
      amount,
      currency,
      status: 'pending',
    });

    res.status(201).json({
      message: 'Payment initiated',
      payment,
    });
  } catch (error) {
    res.status(500).json({ message: 'Payment failed', error: error.message });
  }
});

// Admin: Get all ads (including pending)
app.get('/admin/ads', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin' && req.user.role !== 'moderator') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const { status, page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    const where = {};
    if (status) where.status = status;

    const ads = await Ad.findAndCountAll({
      where,
      include: [
        { model: User, as: 'user', attributes: ['id', 'username', 'email'] },
        { model: Category, as: 'category', attributes: ['id', 'name'] },
        { model: City, as: 'city', attributes: ['id', 'name'] },
      ],
      offset,
      limit: parseInt(String(limit)),
      order: [['createdAt', 'DESC']],
    });

    res.json({
      data: ads.rows,
      total: ads.count,
      pages: Math.ceil(ads.count / limit),
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch ads', error: error.message });
  }
});

// Admin: Approve/Reject ad
app.put('/admin/ads/:id/status', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin' && req.user.role !== 'moderator') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const { status, rejectionReason } = req.body;
    const ad = await Ad.findByPk(req.params.id);

    if (!ad) {
      return res.status(404).json({ message: 'Ad not found' });
    }

    if (!['approved', 'rejected', 'published'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    ad.status = status;
    if (rejectionReason) {
      ad.description = (ad.description || '') + `\n\nRejection Reason: ${rejectionReason}`;
    }
    await ad.save();

    res.json({ message: `Ad ${status} successfully`, ad });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update ad status', error: error.message });
  }
});

// Admin: Get all users
app.get('/admin/users', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const { page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    const users = await User.findAndCountAll({
      attributes: ['id', 'username', 'email', 'role', 'createdAt'],
      offset,
      limit: parseInt(String(limit)),
      order: [['createdAt', 'DESC']],
    });

    res.json({
      data: users.rows,
      total: users.count,
      pages: Math.ceil(users.count / limit),
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error: error.message });
  }
});

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Backend Working ✅', status: 'online' });
});

// ===== DATABASE SYNC & SERVER START =====

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ MySQL Connected');

    await sequelize.sync({ alter: false });
    console.log('✅ Database Models Synchronized');

    // Seed data
    await seedData();

    if (process.env.VERCEL) {
      console.log('Running on Vercel - Skipping app.listen');
      return;
    }

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Database Connection Failed:', error.message);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    // Create categories
    const categories = [
      { name: 'Electronics', slug: 'electronics', description: 'Phones, laptops, gadgets and more' },
      { name: 'Fashion', slug: 'fashion', description: 'Clothing, shoes, accessories' },
      { name: 'Home', slug: 'home', description: 'Furniture, appliances, decor' },
      { name: 'Vehicles', slug: 'vehicles', description: 'Cars, bikes, parts' },
      { name: 'Books', slug: 'books', description: 'Books, magazines, educational materials' },
      { name: 'Sports', slug: 'sports', description: 'Sports equipment and gear' },
      { name: 'Jobs', slug: 'jobs', description: 'Job postings and services' },
      { name: 'Services', slug: 'services', description: 'Professional services' },
    ];

    for (const cat of categories) {
      await Category.findOrCreate({
        where: { name: cat.name },
        defaults: cat,
      });
    }

    // Create cities
    const cities = [
      { name: 'Karachi', slug: 'karachi', country: 'Pakistan' },
      { name: 'Lahore', slug: 'lahore', country: 'Pakistan' },
      { name: 'Islamabad', slug: 'islamabad', country: 'Pakistan' },
      { name: 'Multan', slug: 'multan', country: 'Pakistan' },
      { name: 'Peshawar', slug: 'peshawar', country: 'Pakistan' },
      { name: 'Quetta', slug: 'quetta', country: 'Pakistan' },
    ];

    for (const city of cities) {
      await City.findOrCreate({
        where: { name: city.name },
        defaults: city,
      });
    }

    // Create demo user if not exists
    const demoEmail = 'demo@example.com';
    let demoUser = await User.findOne({ where: { email: demoEmail } });
    if (!demoUser) {
      const hashedPassword = await bcrypt.hash('Demo123!', 10);
      demoUser = await User.create({
        username: 'DemoUser',
        email: demoEmail,
        password: hashedPassword,
        role: 'admin',
      });
      console.log('✅ Demo user created: demo@example.com / Demo123!');
    }

    const userId = demoUser.id;

    // Make first user admin
    const firstUser = await User.findOne();
    if (firstUser) {
      await firstUser.update({ role: 'admin' });
    }

    // Create sample ads
    const sampleAds = [
      {
        title: 'iPhone 15 Pro Max - Brand New',
        description: 'Latest iPhone 15 Pro Max with 256GB storage. Still in warranty. Perfect condition.',
        price: 250000,
        categoryId: 1, // Electronics
        cityId: 1, // Karachi
        userId: userId,
        status: 'published',
      },
      {
        title: 'Designer Leather Jacket',
        description: 'Premium leather jacket in excellent condition. Size M. Perfect for winter.',
        price: 15000,
        categoryId: 2, // Fashion
        cityId: 2, // Lahore
        userId: userId,
        status: 'published',
      },
      {
        title: 'Honda Civic 2018 - Low Mileage',
        description: 'Well maintained Honda Civic 2018 with only 45,000 km. Single owner. All service records available.',
        price: 3200000,
        categoryId: 4, // Vehicles
        cityId: 1, // Karachi
        userId: userId,
        status: 'published',
      },
      {
        title: 'Modern Sofa Set - 7 Seater',
        description: 'Beautiful modern sofa set for living room. Comfortable and stylish. 2 years old.',
        price: 85000,
        categoryId: 3, // Home
        cityId: 3, // Islamabad
        userId: userId,
        status: 'published',
      },
      {
        title: 'MacBook Pro M3 - 16GB RAM',
        description: 'Apple MacBook Pro with M3 chip, 16GB RAM, 512GB SSD. Perfect for developers.',
        price: 280000,
        categoryId: 1, // Electronics
        cityId: 2, // Lahore
        userId: userId,
        status: 'published',
      },
      {
        title: 'Cricket Bat - Professional Grade',
        description: 'English willow cricket bat. Used only few times. Comes with cover.',
        price: 12000,
        categoryId: 6, // Sports
        cityId: 4, // Multan
        userId: userId,
        status: 'published',
      },
    ];

    for (const ad of sampleAds) {
      await Ad.findOrCreate({
        where: { title: ad.title },
        defaults: ad,
      });
    }

    console.log('✅ Sample data seeded');
  } catch (error) {
    console.error('❌ Error seeding data:', error.message);
  }
};

startServer();

module.exports = app;