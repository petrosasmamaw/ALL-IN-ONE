import express from "express";
import upload from "../middlewares/uploadImage.js";
import {
  getAllItems,
  getItemsBySellerId,
  createItem,
  updateItem,
  deleteItem,
} from "../controllers/itemController.js";

const router = express.Router();

router.get("/", getAllItems);
router.get("/seller/:sellerId", getItemsBySellerId);
router.post("/", upload.single("image"), createItem);
router.put("/:id", upload.single("image"), updateItem);
router.delete("/:id", deleteItem);

export default router;
