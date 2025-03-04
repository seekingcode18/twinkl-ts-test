import express from 'express';
import { createUser } from '../controllers/users.ts';

const router = express.Router();

router.post('/users', createUser);

export default router;
