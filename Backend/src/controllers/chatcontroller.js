import Chat from "../model/Chat.js";

export const getAllChats = async (req, res) => {
  try {
    const chats = await Chat.find();
    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }         
};
export const createChat = async (req, res) => {
  try {
    const { itemId, clientId, sellerId, message, senderId } = req.body;
    if (!itemId || !clientId || !sellerId || !message || !senderId) {
      return res.status(400).json({ message: "Missing required chat fields" });
    }

    // Try to find existing chat for the same item/client/seller
    let chat = await Chat.findOne({ itemId, clientId, sellerId });
    if (chat) {
      // append new message
      chat.messages.push({ senderId, text: message });
      await chat.save();
      return res.status(200).json(chat);
    }

    // Create new chat document with first message
    const newChat = new Chat({
      itemId,
      clientId,
      sellerId,
      messages: [{ senderId, text: message }],
    });
    await newChat.save();
    res.status(201).json(newChat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getChatByitemIdClientIdSellerId = async (req, res) => {
    try {
        const { itemId, clientId, sellerId } = req.params;
        const chat = await Chat.findOne({ itemId, clientId, sellerId });
        if (!chat) {
            return res.status(404).json({ message: "Chat not found" });
        }
        res.status(200).json(chat);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getChatsBySellerId = async (req, res) => {
    try {
        const { sellerId } = req.params;
        const chats = await Chat.find({ sellerId });
        res.status(200).json(chats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getChatsByClientId = async (req, res) => {
    try {
        const { clientId } = req.params;
        const chats = await Chat.find({ clientId });
        res.status(200).json(chats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }   
};
export const deleteChat = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedChat = await Chat.findByIdAndDelete(id);
    if (!deletedChat) {
      return res.status(404).json({ message: "Chat not found" });
    }
    res.status(200).json({ message: "Chat deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });   
    }   
};