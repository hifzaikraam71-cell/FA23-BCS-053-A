const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connect
mongoose.connect('mongodb://127.0.0.1:27017/adflow')
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Schema
const AdSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  status: {
    type: String,
    default: "pending"
  }
});

const Ad = mongoose.model("Ad", AdSchema);

// TEST route
app.get('/', (req, res) => {
  res.send("Backend Working ✅");
});

// Create Ad
app.post('/ads', async (req, res) => {
  try {
    const newAd = new Ad(req.body);
    await newAd.save();
    res.send(newAd);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error creating ad");
  }
});

// Get ALL ads (admin)
app.get('/admin/ads', async (req, res) => {
  try {
    const ads = await Ad.find();
    res.send(ads);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching ads");
  }
});

// Get approved ads (public)
app.get('/ads', async (req, res) => {
  try {
    const ads = await Ad.find({ status: "approved" });
    res.send(ads);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching ads");
  }
});

// Update status
app.put('/ads/:id', async (req, res) => {
  try {
    const updated = await Ad.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.send(updated);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error updating ad");
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});