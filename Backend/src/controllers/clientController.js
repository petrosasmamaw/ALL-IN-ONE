import Client from "../model/Client.js";

export const getAllClient = async (req, res) => {
  try {
    const clients = await Client.find();
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getClientByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const client = await Client.findOne({ userId });
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }
    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createClient = async (req, res) => {
  try {
    const { name, userId, phoneNo, status } = req.body;

    const image = req.file ? req.file.path : "";

    const newClient = new Client({
      name,
      userId,
      phoneNo,
      status,
      image,
    });

    await newClient.save();
    res.status(201).json(newClient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phoneNo, status } = req.body;

    const updatedData = {
      name,
      phoneNo,
      status,
    };

    if (req.file) {
      updatedData.image = req.file.path;
    }

    const updatedClient = await Client.findByIdAndUpdate(
      id,
      updatedData,
      { new: true }
    );

    res.status(200).json(updatedClient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;
    await Client.findByIdAndDelete(id);
    res.status(200).json({ message: "Client deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
