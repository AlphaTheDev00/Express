import express from 'express';
import supplements from './data.js';
import mongoose from 'mongoose';
import connectDB from './db.js';
import Supplement from './Model/Supplements.js';

const app = express()
app.use(express.json())

connectDB();

// GET /supplements - Return all supplements
app.get('/supplements', async (req, res) => {
  try {
    const supplements = await Supplement.find();
    res.status(200).json(supplements);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});

// GET /supplements/:name - Return a supplement by name
app.get('/supplements/:name', async (req, res) => {
  try {
    const supplement = await Supplement.findOne({ name: req.params.name});
    if (!supplement) {
      return res.status(404).json({ message: 'Supplement not found'});
    }
    res.status(200).json(supplement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


//PUT / Update supplement by Name
app.put('/supplements/:name', async (req, res) => {
  try {
    const supplement = await Supplement.findOneAndUpdate(
      { name: req.params.name},
      req.body,
      {new : true} // Return the update document
    );
    if (!supplement) {
      return res.status(404).json({ message: 'Supplement not found'});
    }
    res.status(200).json({message: 'Supplement updated successfully', updated: supplement});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
  

// POST /supplements - Add a new supplement
app.post('/supplements', async (req, res) => {
 try {
  const newSupplement = new Supplement(req.body);
  const savedSupplement = await newSupplement.save();
  res.status(201).json(savedSupplement);
 } catch (error) {
  
  if (error.name === 'ValidationError') {
    res.status(400).json({ message: 'Validation Error', errors: error.errors});
  } else {
  res.status(500).json({message: error.message});
  }
 }
});

//Delete a supplement by name
app.delete('/supplements/:name', async (req, res) => {
    try {
      const deletedSupplement = await Supplement.findOneAndDelete({ name: req.params.name});
      if (!deletedSupplement) {
        return res.status(404).json({ message: 'Supplement not found'});
      }
      res.status(200).json({ message: 'Supplement deleted successfully', deleted: deletedSupplement});
    } catch (error) {
      res.status(500).json({ message: error.message});
    }
  });

  const port = 3000; // Change to another available port
  app.listen(port, () => {
    console.log(`Server is running on port ${port}!`);
  });
