import express from "express";
import upload from "../middlewares/uploadImage.js";
import {
  getAllClient,
  createClient,
  updateClient,
  deleteClient,
  getClientByUserId,
} from "../controllers/clientController.js";

const router = express.Router();

router.get("/", getAllClient);
router.get("/user/:userId", getClientByUserId);
router.post("/", upload.single("image"), createClient);
router.put("/:id", upload.single("image"), updateClient);
router.delete("/:id", deleteClient);

export default router;
