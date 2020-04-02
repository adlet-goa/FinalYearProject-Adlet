const express = require('express');
const adController = require('./../controllers/adController');
const authController = require('./../controllers/authController');

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router
  .route('/')
  .get(adController.getAllAds)
  .post(
    authController.restrictTo('advertiser', 'admin'),
    adController.setKioskUserIds,
    adController.createAd
  );

router
  .route('/:id')
  .get(adController.getAd)
  .patch(
    authController.restrictTo('advertiser', 'admin'),
    adController.uploadContent,
    adController.uploadToStorage,
    adController.updateAd
  )
  .delete(
    authController.restrictTo('advertiser', 'admin'),
    adController.deleteAd
  );

module.exports = router;
