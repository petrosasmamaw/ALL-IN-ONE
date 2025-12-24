import Ids from "../model/Ids.js";
import Seller from "../model/Seller.js";
import Client from "../model/Client.js";
import mongoose from "mongoose";

export const getAllIds = async (req, res) => {
    try {
        const ids = await Ids.find();
        res.status(200).json(ids);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const createIds = async (req, res) => {
    try {
        let { itemId, sellerId, clientId } = req.body;

        // resolve sellerId if a userId string is supplied
        if (!mongoose.Types.ObjectId.isValid(sellerId)) {
            const seller = await Seller.findOne({ userId: sellerId });
            if (!seller) return res.status(400).json({ message: "Seller not found" });
            sellerId = seller._id;
        }

        // resolve clientId if a userId string is supplied
        if (!mongoose.Types.ObjectId.isValid(clientId)) {
            const client = await Client.findOne({ userId: clientId });
            if (!client) return res.status(400).json({ message: "Client not found" });
            clientId = client._id;
        }

        const newIds = new Ids({ itemId, sellerId, clientId });
        await newIds.save();
        res.status(201).json(newIds);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
export const getIdsBySellerId = async (req, res) => {
    const { sellerId } = req.params;
    try {
        const ids = await Ids.find({ sellerId });
        res.status(200).json(ids);
    } catch (error) {
        res.status(500).json({ message: error.message });
    } 
};
export const getIdsByClientId = async (req, res) => {
    const { clientId } = req.params;
    try {
        const ids = await Ids.find({ clientId });
        res.status(200).json(ids);
    } catch (error) {
        res.status(500).json({ message: error.message });
    } 
};
export const deleteIds = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedIds = await Ids.findByIdAndDelete(id);
        if (!deletedIds) {
            return res.status(404).json({ message: "Ids not found" });
        }
        res.status(200).json({ message: "Ids deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};