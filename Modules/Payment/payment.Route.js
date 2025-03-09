
import express from 'express';
import { pay, success, cancel } from './payment.Controller.js';

const router = express.Router();

router.get('/get', (req, res) => res.sendFile(__dirname + '/../Views/index.html'));

router.post('/pay', pay);

router.get('/success', success);

router.get('/cancel', cancel);

export default router;
