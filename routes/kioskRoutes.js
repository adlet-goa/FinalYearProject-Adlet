const express = require('express');
const kioskController = require('./../controllers/kioskController');
const authController = require('./../controllers/authController');
const adRouter = require('./../routes/adRoutes');

const router = express.Router();

// POST /kiosk/234fad4/ads
// GET /kiosk/234fad4/ads
router.use('/:kioskId/ads', adRouter);

// /kiosks-within?distance=233&center=-40,45
// /kiosks-within/233/center/-40,45
router
  .route('/kiosks-within/:distance/center/:latlng/')
  .get(kioskController.getKiosksWithin);

router.route('/distances/:latlng').get(kioskController.getDistances);

router
  .route('/')
  .get(kioskController.getAllKiosks)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'publisher'),
    kioskController.createKiosk
  );

router
  .route('/:id')
  .get(kioskController.getKiosk)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'publisher'),
    kioskController.updateKiosk
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'publisher'),
    kioskController.deleteKiosk
  );

module.exports = router;
