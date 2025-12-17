import express from 'express';
import { getAllIds, createIds, getIdsBySellerId,getIdsByClientId, deleteIds } from '../controllers/idController';

const router = express.Router();

router.get('/', getAllIds);
router.post('/', createIds);
router.get('/seller/:sellerId', getIdsBySellerId);
router.get('/client/:clientId', getIdsByClientId);
router.delete('/:id', deleteIds);

export default router;