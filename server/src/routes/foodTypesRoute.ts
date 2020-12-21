import express, { Router } from 'express';
import FoodTypesController from '../controllers/foodTypesController';

const router = Router();
const foodTypeController = new FoodTypesController();

router.get('/', foodTypeController.get);

export default router;