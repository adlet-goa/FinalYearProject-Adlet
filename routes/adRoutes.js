const express = require('express');
const adController = require('./../controllers/adController');
const authController = require('./../controllers/authController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(adController.getAllAds)
  .post(
    authController.protect,
    authController.restrictTo('advertiser', 'admin'),
    adController.setKioskUserIds,
    adController.setPriceReach,
    adController.createAd
  );

router
  .route('/:id')
  .get(adController.getAd)
  .patch(
    authController.protect,
    authController.restrictTo('advertiser', 'admin'),
    adController.uploadContent,
    adController.uploadToStorage,
    adController.setPriceReach,
    adController.updateAd
  )
  .delete(
    authController.protect,
    authController.restrictTo('advertiser', 'admin'),
    adController.deleteAd
  );

module.exports = router;
