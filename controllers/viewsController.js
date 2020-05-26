const User = require('../models/userModel');
const Kiosk = require('../models/kioskModel');
const Ad = require('../models/adModel');
const catchAsync = require('../utils/catchAsync');
//const AppError = require('../utils/appError');

exports.getOverview = catchAsync(async (req, res, next) => {
  const kiosks = await Kiosk.find();
  const kiosksArray = [];

  kiosks.forEach(function(el) {
    kiosksArray.push(el.location);
  });

  res.status(200).render('overview', {
    title: 'Landing Page',
    kiosksArray
  });
});

exports.getSignupForm = (req, res) => {
  res.status(200).render('signup', {
    title: 'Signup to Adlet'
  });
};

exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Log in'
  });
};

exports.getResetPasswordMail = (req, res) => {
  res.status(200).render('forgot-password', {
    title: 'Forgot password'
  });
};

exports.getResetPasswordForm = (req, res) => {
  res.status(200).render('reset-password', {
    title: 'Reset password'
  });
};

exports.getAccount = catchAsync(async (req, res, next) => {
  const kiosks = await Kiosk.find();
  const kiosksArray = [];

  kiosks.forEach(function(el) {
    kiosksArray.push(el.location);
  });

  res.status(200).render('account', {
    title: 'Your Account',
    kiosksArray
  });
});

exports.getAccountSettings = catchAsync(async (req, res, next) => {
  res.status(200).render('settings', {
    title: 'Settings Page'
  });
});

exports.getAccountRP = catchAsync(async (req, res, next) => {
  res.status(200).render('publisher', {
    title: 'Publisher Page'
  });
});

exports.getAccountRA = catchAsync(async (req, res, next) => {
  const kiosks = await Kiosk.find();
  res.status(200).render('advertiser', {
    title: 'Advertiser Page',
    kiosks
  });
});
exports.getUploadAds = catchAsync(async (req, res, next) => {
  res.status(200).render('uploadads', {
    title: 'View Upload Ads Page'
  });
});

exports.getViewAds = catchAsync(async (req, res, next) => {
  const ads = await Ad.find();
  res.status(200).render('my-ads', {
    title: 'View Ads Page',
    ads
  });
});

exports.getViewKiosks = catchAsync(async (req, res, next) => {
  const ads = await Ad.find();
  res.status(200).render('my-kiosks', {
    title: 'View Kiosks Page',
    ads
  });
});

exports.updateUserData = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email
    },
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).render('settings', {
    title: 'Your account settings',
    user: updatedUser
  });
});

exports.getPayment = catchAsync(async (req, res, next) => {
  const ads = await Ad.find();
  res.status(200).render('payment', {
    title: 'View Payment Page',
    ads
  });
});
