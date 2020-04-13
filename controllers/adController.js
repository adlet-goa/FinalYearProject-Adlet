const { format } = require('util');
const mongoose = require('mongoose');
const multer = require('multer');
const Cloud = require('@google-cloud/storage');
const path = require('path');

const Ad = require('./../models/adModel');
const Kiosk = require('./../models/kioskModel');
const factory = require('./handlerFactory');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');

const { Storage } = Cloud;

const serviceKey = path.join(
  __dirname,
  './../adlet-e4ffd-firebase-adminsdk-44jvg-c84b949a2d.json'
);

const gc = new Storage({
  keyFilename: serviceKey,
  projectId: 'adlet-e4ffd',
});
const bucket = gc.bucket('adlet-e4ffd.appspot.com');

exports.setKioskUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.kiosk) req.body.kiosk = req.params.kioskId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    // no larger than 5mb.
    fileSize: 5 * 1024 * 1024,
  },
});

exports.uploadContent = upload.single('content');

const uploadFile = (file) =>
  new Promise((resolve, reject) => {
    const { originalname, buffer } = file;

    const blob = bucket.file(originalname);
    const blobStream = blob.createWriteStream({
      resumable: false,
      metadata: {
        contentType: file.mimetype,
      },
    });

    blobStream
      .on('finish', () => {
        const publicUrl = format(
          `https://storage.googleapis.com/${bucket.name}/${blob.name}`
        );
        resolve(publicUrl);
      })
      .on('error', () => {
        reject(
          new AppError('Unable to upload content, something went wrong', 500)
        );
      })
      .end(buffer);
  });

exports.uploadToStorage = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  const ext = req.file.mimetype.split('/')[1];
  req.file.originalname = `ad-${req.params.id}-${Date.now()}.${ext}`;

  req.body.content = await uploadFile(req.file);
  req.body.mimeType = req.file.mimetype.split('/')[0];

  next();
});

exports.setPriceReach = catchAsync(async (req, res, next) => {
  if (!req.body.kiosks) return next();

  const { ObjectId } = mongoose.Types.ObjectId;
  const kiosksObjIds = req.body.kiosks.map((el) => new ObjectId(el));
  const adKiosks = await Kiosk.find({ _id: { $in: kiosksObjIds } });

  let price = 0;
  let estReach = 0;
  adKiosks.forEach(function (el) {
    price += el.subscription;
    estReach += el.estReach;
  });
  req.body.estReach = estReach;
  req.body.price = price;

  next();
});

exports.getAllAds = factory.getAll(Ad);
exports.getAd = factory.getOne(Ad);
exports.createAd = factory.createOne(Ad);
exports.updateAd = factory.updateOne(Ad);
exports.deleteAd = factory.deleteOne(Ad);
