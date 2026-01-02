import Seller from "../model/Seller.js";

export const getAllSeller = async (req, res) => {
  try {
    const sellers = await Seller.find();
    res.status(200).json(sellers);
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

export const getSellerById = async (req, res) => {
  try {
    const { id } = req.params;
    const seller = await Seller.findById(id);
    if (!seller) return res.status(404).json({ message: 'Seller not found' });
    res.status(200).json(seller);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createSeller = async (req, res) => {
  try {
    const { name, userId, phoneNo, category } = req.body;

    const image = req.file ? req.file.path : "";

    const newSeller = new Seller({
      name,
      userId,
      phoneNo,
      category,
      image,
    });

    await newSeller.save();
    res.status(201).json(newSeller);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateSeller = async (req, res) => {
  try {
    const { id } = req.params;
    // Support both JSON and multipart/form-data (upload.single sets req.file)
    const seller = await Seller.findById(id);
    if (!seller) return res.status(404).json({ message: 'Seller not found' });

    const { name, phoneNo, category, status, userId } = req.body || {};

    if (name !== undefined) seller.name = name;
    if (phoneNo !== undefined) seller.phoneNo = phoneNo;
    if (category !== undefined) seller.category = category;
    if (status !== undefined) seller.status = status;
    if (userId !== undefined) seller.userId = userId;

    if (req.file) {
      seller.image = req.file.path;
    }

    await seller.save();
    res.status(200).json(seller);
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

export const updateSellerStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) return res.status(400).json({ message: 'Missing status' });

    const updatedSeller = await Seller.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedSeller) return res.status(404).json({ message: 'Seller not found' });

    res.status(200).json(updatedSeller);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
