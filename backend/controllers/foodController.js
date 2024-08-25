import foodModel from "../models/foodModel.js";
import fs from 'fs';
import path from 'path';

// Add food item
const addFood = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: "Image file is required" });
    }

    const imageFilename = req.file.filename;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: imageFilename
    });

    try {
        await food.save();
        res.json({ success: true, message: "Food Added" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error adding food item" });
    }
};

// List all food items
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error retrieving food items" });
    }
};

// Remove food item
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);

        if (!food) {
            return res.status(404).json({ success: false, message: "Food item not found" });
        }

        const filePath = path.join('uploads', food.image);

        fs.access(filePath, fs.constants.F_OK, async (err) => {
            if (err) {
                console.error("File does not exist:", err);
                // Proceed to delete the food item from the database even if the file does not exist
                await foodModel.findByIdAndDelete(req.body.id);
                return res.json({ success: true, message: "Food removed, but image file was not found" });
            } else {
                fs.unlink(filePath, async (unlinkErr) => {
                    if (unlinkErr) {
                        console.error("Error deleting file:", unlinkErr);
                        return res.status(500).json({ success: false, message: "Error deleting file" });
                    }

                    await foodModel.findByIdAndDelete(req.body.id);
                    res.json({ success: true, message: "Food removed" });
                });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error removing food item" });
    }
};

export { addFood, listFood, removeFood };
