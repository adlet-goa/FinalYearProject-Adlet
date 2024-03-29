const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');
//const adController = require('../controllers/adController');

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
router.post(
  '/submit-user-data',
  authController.protect,
  viewsController.updateUserData
);
router.get('/publisher', authController.protect, viewsController.getAccountRP);
router.get('/advertiser', authController.protect, viewsController.getAccountRA);
router.get('/my-ads', authController.protect, viewsController.getViewAds);
router.get('/my-kiosks', authController.protect, viewsController.getViewKiosks);
router.get('/uploadads', authController.protect, viewsController.getUploadAds);
router.get('/forgot-password', viewsController.getResetPasswordMail);
router.get('/reset-password', viewsController.getResetPasswordForm);
router.get('/payment', authController.protect, viewsController.getPayment);

module.exports = router;
