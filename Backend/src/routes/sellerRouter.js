import express from 'express';
import upload from '../middlewares/uploadImage.js';
import { getAllSeller, createSeller, updateSeller, deleteSeller, getSellerByUserId, getSellerById, updateSellerStatus } from '../controllers/sellerController.js';

const router = express.Router();

router.get('/', getAllSeller);
router.post('/', upload.single('image'), createSeller);
router.put('/:id', upload.single('image'), updateSeller);
router.patch('/:id/status', updateSellerStatus);
router.delete('/:id', deleteSeller);
router.get('/user/:userId', getSellerByUserId);
router.get('/:id', getSellerById);

export default router;