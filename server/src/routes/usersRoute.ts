import express, { Router } from 'express';
import UsersController from '../controllers/usersController';

const router = Router();
const userController = new UsersController();

router.post('/', userController.addUser);

export default router;