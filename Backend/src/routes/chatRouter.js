import express from "express";
import {
  getAllChats, createChat,
  getChatByitemIdClientIdSellerId, getChatsBySellerId,
    getChatsByClientId, deleteChat,
} from "../controllers/chatcontroller.js";

const router = express.Router();

router.get("/", getAllChats);
router.post("/", createChat);
router.get("/:itemId/:clientId/:sellerId", getChatByitemIdClientIdSellerId);
router.get("/seller/:sellerId", getChatsBySellerId);
router.get("/client/:clientId", getChatsByClientId);
router.delete("/:id", deleteChat);

export default router;