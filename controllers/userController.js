const User = require('./../models/userModel');
const Ad = require('./../models/adModel');
const Kiosk = require('./../models/kioskModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400
      )
    );
  }

  // 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, 'name', 'email');
  //if (req.file) filteredBody.photo = req.file.filename;

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser
    }
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null
  });
});

exports.getMyAds = catchAsync(async (req, res, next) => {
  const ads = await Ad.find({ advertiser: req.user.id });

  res.status(200).json({
    status: 'success',
    data: {
      ads
    }
  });
});

exports.getMyKiosks = catchAsync(async (req, res, next) => {
  const kiosks = await Kiosk.find({ owner: req.user.id }).populate({
    path: 'ads'
  });

  res.status(200).json({
    status: 'success',
    data: {
      kiosks
    }
  });
});

exports.getUserAds = catchAsync(async (req, res, next) => {
  const ads = await Ad.find({ advertiser: req.params.id });

  res.status(200).json({
    status: 'success',
    data: {
      ads
    }
  });
});

exports.getUserKiosks = catchAsync(async (req, res, next) => {
  const kiosks = await Kiosk.find({ owner: req.params.id });

  res.status(200).json({
    status: 'success',
    data: {
      kiosks
    }
  });
});

exports.createUser = factory.createOne(User);

exports.getUser = factory.getOne(User);
exports.getAllUsers = factory.getAll(User);

// Do NOT update passwords with this!
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
