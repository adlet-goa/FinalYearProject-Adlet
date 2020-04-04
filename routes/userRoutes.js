const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

// Protect all routes after this middleware
router.use(authController.protect);

router.patch('/updateMyPassword', authController.updatePassword);
router.get('/me', userController.getMe, userController.getUser);
router.patch('/updateMe', userController.updateMe);
router.delete('/deleteMe', userController.deleteMe);

router
  .route('/getMyAds')
  .get(
    authController.restrictTo('admin', 'advertiser'),
    userController.getMyAds
  );

router
  .route('/getMyKiosks')
  .get(
    authController.restrictTo('admin', 'publisher'),
    userController.getMyKiosks
  );

router.use(authController.restrictTo('admin'));

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

router.route('/getUserAds/:id').get(userController.getUserAds);
router.route('/getUserKiosks/:id').get(userController.getUserKiosks);

module.exports = router;
