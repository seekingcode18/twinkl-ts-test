import express from 'express';
import { createUser, getUser } from '../controllers/users.ts';

const router = express.Router();

router.post('/users', createUser);
router.get('/users/:id', getUser);

export default router;
