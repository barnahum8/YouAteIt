import express, { Router } from 'express';
import BeersController from '../controllers/BeersController';

const router = Router();
const beerController = new BeersController();

router.get('/', beerController.get);

export default router;