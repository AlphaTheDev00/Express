import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/Supplement-db', {
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
};

export default connectDB;