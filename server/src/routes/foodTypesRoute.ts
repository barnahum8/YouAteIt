import express, { Router } from 'express';
import FoodTypesController from '../controllers/FoodTypesController';

const router = Router();
const foodTypeController = new FoodTypesController();

router.get('/', foodTypeController.get);

export default router;