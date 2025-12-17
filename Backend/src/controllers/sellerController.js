import Seller from "../model/Seller.js";

export const getAllSeller = async (req, res) => {
    try {
        const sellers = await Seller.find();
        res.status(200).json(sellers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createSeller = async (req, res) => {
    try {
        const { name, image, userId, phone, status, category } = req.body;
        const newSeller = new Seller({ name, image, userId, phone, status, category });
        await newSeller.save();
        res.status(201).json(newSeller);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateSeller = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, image, phone, status, category } = req.body;
        const updatedSeller = await Seller.findByIdAndUpdate(   
            id,
            { name, image, phone, status, category },
            { new: true }
        );
        res.status(200).json(updatedSeller);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const deleteSeller = async (req, res) => {
    try {
        const { id } = req.params;
        await Seller.findByIdAndDelete(id);
        res.status(200).json({ message: "Seller deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getSellerByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const seller = await Seller.findOne({ userId });
        if (!seller) {
            return res.status(404).json({ message: "Seller not found" });
        }
        res.status(200).json(seller);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};