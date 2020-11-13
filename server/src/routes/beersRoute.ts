import express, { Router } from 'express';
import beersController from '../controllers/beersController';

const router = Router();
const beerController = new beersController();

router.get('/', beerController.get);

export default router;