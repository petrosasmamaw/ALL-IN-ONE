import Item from "../model/Item.js";
import Seller from "../model/Seller.js";
import mongoose from "mongoose";

export const getAllItems = async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getItemsBySellerId = async (req, res) => {
    try {
        const { sellerId } = req.params;

        // Support passing either the Seller._id OR the userId of the seller
        let sellerObjectId = sellerId;
        if (!mongoose.Types.ObjectId.isValid(sellerObjectId)) {
            // treat sellerId as a userId and resolve the Seller document
            const seller = await Seller.findOne({ userId: sellerId });
            if (!seller) return res.status(200).json([]);
            sellerObjectId = seller._id;
        }

        const items = await Item.find({ sellerId: sellerObjectId });
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const createItem = async (req, res) => {
    try {
        const { name, sellerId, category, description, price, status } = req.body;
        const image = req.file ? req.file.path : (req.body.image || "");

        if (!name || !sellerId || !category || price === undefined || price === null || price === "") {
            return res.status(400).json({ message: "Missing required fields: name, sellerId, category, price" });
        }

        // Accept either Seller ObjectId or userId string and map to Seller._id
        let sellerObjectId = sellerId;
        if (!mongoose.Types.ObjectId.isValid(sellerObjectId)) {
            const seller = await Seller.findOne({ userId: sellerId });
            if (!seller) return res.status(400).json({ message: "Invalid sellerId or seller not found" });
            sellerObjectId = seller._id;
        }

        const numPrice = Number(price);
        if (Number.isNaN(numPrice)) {
            return res.status(400).json({ message: "Price must be a number" });
        }

        const newItem = new Item({ name, image, sellerId: sellerObjectId, category, description, price: numPrice, status: status || "active" });
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message || "Internal Server Error" });
    }
};

export const updateItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, sellerId, category, description, price, status } = req.body;
        const updatedData = { name, category, description, status };
        if (sellerId) {
            if (mongoose.Types.ObjectId.isValid(sellerId)) {
                updatedData.sellerId = sellerId;
            } else {
                const seller = await Seller.findOne({ userId: sellerId });
                if (!seller) return res.status(400).json({ message: "Invalid sellerId or seller not found" });
                updatedData.sellerId = seller._id;
            }
        }
        if (price !== undefined) updatedData.price = Number(price);
        if (req.file) updatedData.image = req.file.path;

        const updatedItem = await Item.findByIdAndUpdate(id, updatedData, { new: true });
        res.status(200).json(updatedItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message || "Internal Server Error" });
    }
};
export const deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        await Item.findByIdAndDelete(id);
        res.status(200).json({ message: "Item deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};