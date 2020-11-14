import express, { Router } from 'express';
import usersController from '../controllers/usersController';

const router = Router();
const userController = new usersController();

router.post('/', userController.addUser);

export default router;