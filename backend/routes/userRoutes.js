import express from 'express';
import * as user from '../controllers/userController.js';

const router = express.Router();

router.post('/register', user.createUser);

router.post('/login', user.loginUser);

router.get('/:userId', user.getUser);

router.post('/request', user.saveRequestedUser);

export default router;
