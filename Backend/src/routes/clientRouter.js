import express from 'express';
import upload from '../middlewares/uploadImage.js'
import { createClient, getAllClient, updateClient,deleteClient,getClientByUserId } from '../controllers/clientController.js';

const router = express.Router();

router.get('/', getAllClient);
router.post('/', upload.single('image'), createClient);
router.put('/:id', upload.single('image'), updateClient);
router.delete('/:id', deleteClient);
router.get('/user/:userId', getClientByUserId);

export default router;