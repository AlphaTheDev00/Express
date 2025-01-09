import express from 'express'
import Supplement from '../Model/Supplements.js'
import CustomError from '../utils/customError.js';
import errorHandler from '../middleware/errorHandler.js';


const router = express.Router();


// GET /supplements - Return all supplements
export const getSupplements = async (req, res, next) => {
    try {
      const supplements = await Supplement.find();
      res.status(200).json(supplements);
    } catch (err) {
     next(err); // Passing error to next middleware (errorHandler)
    }
  };
  
  // GET /supplements/:name - Return a supplement by name
  export const getSupplementByName = async (req, res, next) => {
    try {
      const supplement = await Supplement.findOne({ name: req.params.name });
      if (!supplement) {
        return res.status(404).json({ message: 'Supplement not found' });
      }
      res.status(200).json(supplement);
    } catch (error) {
        next(new CustomError('Error retrieving supplements', 500));
    }
  };
  
  // PUT /supplements/:name - Update supplement by Name
  export const updateSupplement = async (req, res, next) => {
    try {
      const supplement = await Supplement.findOneAndUpdate(
        { name: req.params.name },
        req.body,
        { new: true }
      );
      if (!supplement) {
        return res.status(404).json({ message: 'Supplement not found' });
      }
      res.status(200).json({ message: 'Supplement updated successfully', updated: supplement });
    } catch (error) {
        next(new CustomError('Error retrieving supplements', 500));
    }
  };
  
  // POST /supplements - Add a new supplement
  export const addSupplement = async (req, res, next) => {
    try {
      const newSupplement = new Supplement(req.body);
      const savedSupplement = await newSupplement.save();
      res.status(201).json(savedSupplement);
    } catch (error) {
        next(error);
    }
  };
  
  // DELETE /supplements/:name - Delete a supplement by name
  export const deleteSupplement = async (req, res, next) => {
    try {
      const deletedSupplement = await Supplement.findOneAndDelete({ name: req.params.name });
      if (!deletedSupplement) {
        return res.status(404).json({ message: 'Supplement not found' });
      }
      res.status(200).json({ message: 'Supplement deleted successfully', deleted: deletedSupplement });
    } catch (error) {
        next(new CustomError('Error retrieving supplements', 500));
    }
  };

  export default router;