import Chat from "../model/Chat.js";

export const getChatsbyItemId = async (req, res) => {
    const { itemId } = req.params;
    try {
        const chats = await Chat.find({ itemId });
        res.status(200).json(chats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getChatBySellerIdAndClientId = async (req, res) => {
    const { sellerId, clientId } = req.params;
    try {
        const chats = await Chat.find({ sellerId, clientId });
        res.status(200).json(chats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createChat = async (req, res) => {
    const { itemId, clientId, sellerId, text, senderId } = req.body;
    const newChat = new Chat({ itemId, clientId, sellerId, text, senderId });
    try {
        await newChat.save();
        res.status(201).json(newChat);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
export const deleteChat = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedChat = await Chat.findByIdAndDelete(id);
        if (!deletedChat) {
            return res.status(404).json({ message: "Chat not found" });
        }   
        res.status(200).json({ message: "Chat deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }   
};