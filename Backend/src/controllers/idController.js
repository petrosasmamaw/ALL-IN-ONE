import Ids from "../model/Ids.js";

export const getAllIds = async (req, res) => {
    try {
        const ids = await Ids.find();
        res.status(200).json(ids);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const createIds = async (req, res) => {
    const { itemId, sellerId, clientId } = req.body;
    const newIds = new Ids({ itemId, sellerId, clientId });
    try {
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