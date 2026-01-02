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
        // Support querying by either Seller._id (legacy) or seller userId (Supabase UUID)
        if (mongoose.Types.ObjectId.isValid(sellerId)) {
            // querying by Seller._id (stored as string on Item.sellerId)
            const items = await Item.find({ sellerId });
            return res.status(200).json(items);
        }

        // sellerId is not an ObjectId — treat as userId. Find matching Seller document.
        const seller = await Seller.findOne({ userId: sellerId });
        if (!seller) return res.status(200).json([]);

        // Return items that reference either the userId (new style) or the Seller._id (legacy)
        const items = await Item.find({ $or: [{ sellerId: sellerId }, { sellerId: seller._id.toString() }] });
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

        // If sellerId is a Mongo ObjectId string, store it as-is (legacy behavior).
        // If sellerId is not an ObjectId, treat it as the seller userId (Supabase UUID)
        // and verify a Seller record exists for that userId.
        let storedSellerId = sellerId;
        if (!mongoose.Types.ObjectId.isValid(sellerId)) {
            const seller = await Seller.findOne({ userId: sellerId });
            if (!seller) return res.status(400).json({ message: "Invalid sellerId or seller not found" });
            // store the userId string (not the Seller._id) so item.sellerId === userId
            storedSellerId = seller.userId;
        }

        const numPrice = Number(price);
        if (Number.isNaN(numPrice)) {
            return res.status(400).json({ message: "Price must be a number" });
        }

        const newItem = new Item({ name, image, sellerId: storedSellerId, category, description, price: numPrice, status: status || "active" });
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
                // legacy: sellerId is a Mongo _id
                updatedData.sellerId = sellerId;
            } else {
                // treat sellerId as userId and verify Seller exists, then store userId
                const seller = await Seller.findOne({ userId: sellerId });
                if (!seller) return res.status(400).json({ message: "Invalid sellerId or seller not found" });
                updatedData.sellerId = seller.userId;
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