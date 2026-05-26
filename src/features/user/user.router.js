import express from 'express';
import UserController from './user.controller.js';

import signUpValidation from '../../middleware/signUpValidation.js';

const userRouter = express.Router();
const userController = new UserController();

userRouter.post('/signup', signUpValidation, (req, res, next) => userController.userSignUp(req, res, next));
userRouter.post('/login', (req, res, next) => userController.userLogin(req, res, next));
userRouter.get('/show/:id', (req, res, next) => userController.showUser(req, res, next));
export default userRouter;