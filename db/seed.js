import mongoose from "mongoose";
import connectDB from "../db.js";
import Supplement from "../Model/Supplements.js";
import supplements from "../data.js";

const seedDB = async () => {
    try {
        await connectDB();

        await Supplement.deleteMany({});

        await Supplement.insertMany(supplements);

        console.log("Database seeded successfully!");
        mongoose.connection.close();
    } catch (error) {
        console.error("Error seeding database:", error.message);
        mongoose.connection.close();
    }
};

seedDB();