import express from 'express';
import { getChatBySellerIdAndClientId, getChatsbyItemId, createChat,deleteChat } from '../controllers/chatController.js';

const router = express.Router();

router.get('/item/:itemId', getChatsbyItemId);
router.get('/seller/:sellerId/client/:clientId', getChatBySellerIdAndClientId);
router.post('/', createChat);
router.delete('/:id', deleteChat);

export default router;