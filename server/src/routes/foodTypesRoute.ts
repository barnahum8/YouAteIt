import express, { Router } from 'express';
import foodTypesController from '../controllers/foodTypesController';

const router = Router();
const foodTypeController = new foodTypesController();

router.get('/', foodTypeController.get);

export default router;