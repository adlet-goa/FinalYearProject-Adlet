const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', authController.isLoggedIn, viewsController.getOverview);
router.get('/login', authController.isLoggedIn, viewsController.getLoginForm);
router.get('/signup', authController.isLoggedIn, viewsController.getSignupForm);
router.get('/me', authController.protect, viewsController.getAccount);
router.get(
  '/my-settings',
  authController.protect,
  viewsController.getAccountSettings
);
router.get('/publisher', authController.protect, viewsController.getAccountRP);
router.get('/advertiser', authController.protect, viewsController.getAccountRP);

module.exports = router;
