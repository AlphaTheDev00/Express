import express from 'express';
import supplements from './data.js';
import mongoose from 'mongoose';
import connectDB from './db.js';
import Supplement from './Model/Supplements.js';
import * as supplementsController from './controllers/supplementController.js';
import errorHandler from './middleware/errorHandler.js';

const app = express()
app.use(express.json())

connectDB();

// Routes
app.get('/supplements', supplementsController.getSupplements);
app.get('/supplements/:name', supplementsController.getSupplementByName);
app.put('/supplements/:name', supplementsController.updateSupplement);
app.post('/supplements', supplementsController.addSupplement);
app.delete('/supplements/:name', supplementsController.deleteSupplement);

// Error handling middleware
app.use(errorHandler);

  const port = 3000; // Change to another available port
  app.listen(port, () => {
    console.log(`Server is running on port ${port}!`);
  });
