import express from 'express';

import HomeController from '../controllers/home.controller.js';

const router = express.Router();

router.route('/').get(HomeController.get);

export default router;
