const express = require('express');
const userRouter = express.Router();
const UserController = require('../controllers/UserController');

userRouter.get('/', UserController.findAllUsers);
userRouter.get('/count', UserController.countUsers);
userRouter.get('/:id', UserController.findUserById);
userRouter.post('/', UserController.createUser);

userRouter.put('/:id', UserController.updateUser);
userRouter.delete('/:id', UserController.deleteUser);
userRouter.delete('/', UserController.deleteAllUsers);

module.exports = userRouter;

