import express from 'express';
import { getChatBySellerIdAndClientId, getChatsbyItemId, createChat,deleteChat,getChatById } from '../controllers/chatController.js';

const router = express.Router();

router.get('/item/:itemId', getChatsbyItemId);
router.get('/seller/:sellerId/client/:clientId', getChatBySellerIdAndClientId);
router.get('/:id', getChatById);
router.post('/', createChat);
router.delete('/:id', deleteChat);

export default router;