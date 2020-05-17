const Kiosk = require('./../models/kioskModel');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('./../utils/appError');

exports.getAllKiosks = factory.getAll(Kiosk);
exports.getKiosk = factory.getOne(Kiosk, { path: 'ads' });
exports.createKiosk = factory.createOne(Kiosk);
exports.updateKiosk = factory.updateOne(Kiosk);
exports.deleteKiosk = factory.deleteOne(Kiosk);

// /kiosks-within/:distance/center/:latlng
// /kiosks-within/233/center/34.111745,-118.113491
exports.getKiosksWithin = catchAsync(async (req, res, next) => {
  const { distance, latlng } = req.params;
  const [lat, lng] = latlng.split(',');

  const radius = distance / 6378.1;

  if (!lat || !lng) {
    next(
      new AppError(
        'Please provide latitude and longitude in the format lat,lng.',
        400
      )
    );
  }

  const kiosks = await Kiosk.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
  });

  res.status(200).json({
    status: 'success',
    results: kiosks.length,
    data: {
      data: kiosks
    }
  });
});

exports.getDistances = catchAsync(async (req, res, next) => {
  const { latlng } = req.params;
  const [lat, lng] = latlng.split(',');

  const multiplier = 0.001;

  if (!lat || !lng) {
    next(
      new AppError(
        'Please provide latitutr and longitude in the format lat,lng.',
        400
      )
    );
  }

  const distances = await Kiosk.aggregate([
    {
      $geoNear: {
        near: {
          type: 'Point',
          coordinates: [lng * 1, lat * 1]
        },
        distanceField: 'distance',
        distanceMultiplier: multiplier
      }
    },
    {
      $project: {
        distance: 1,
        name: 1
      }
    }
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      data: distances
    }
  });
});
