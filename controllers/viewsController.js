const User = require('../models/userModel');
const Kiosk = require('../models/kioskModel');
const Ad = require('../models/adModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getOverview = catchAsync(async (req, res, next) => {
  res.status(200).render('overview', {
    title: 'Landing Page'
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

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your account'
  });
};

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
  res.status(200).render('advertiser', {
    title: 'Advertiser Page'
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
  res.status(200).render('my-kiosks', {
    title: 'View Kiosks Page'
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

  res.status(200).render('account', {
    title: 'Your account',
    user: updatedUser
  });
});
