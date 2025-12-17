import Item from "../model/Item.js";

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
        const items = await Item.find({ sellerId });
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const createItem = async (req, res) => {
    try {
        const { name, image, sellerId, category, description, price, status } = req.body;
        const newItem = new Item({ name, image, sellerId, category, description, price, status });
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, image, sellerId, category, description, price, status } = req.body;
        const updatedItem = await Item.findByIdAndUpdate(
            id,
            { name, image, sellerId, category, description, price, status },
            { new: true }
        );
        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
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