const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Ad = require('../models/adModel');
const User = require('../models/userModel');
const Booking = require('../models/bookingModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  // 1) Get the currently booked ad
  const ad = await Ad.findById(req.params.adId);

  // 2) Create checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    //this page will load once successful ps: do changes accordingly
    success_url: `${req.protocol}://${req.get('host')}/account`,
    //this page will load if failed, ps: do changes accordingly
    cancel_url: `${req.protocol}://${req.get('host')}/account`,
    customer_email: req.user.email,
    client_reference_id: req.params.adId,
    line_items: [
      {
        name: `Title: ${ad.title}`,
        description: `Category: ${ad.category}`,
        //amt in paise
        amount: ad.price * 100,
        currency: 'inr',
        quantity: 1
      }
    ]
  });

  // 3) Create session as response
  res.status(200).json({
    status: 'success',
    session
  });
});

const createBookingCheckout = async session => {
  const ad = session.client_reference_id;
  const user = (await User.findOne({ email: session.customer_email })).id;
  const price = session.display_items[0].amount / 100;
  await Booking.create({ ad, user, price });
};

exports.webhookCheckout = (req, res, next) => {
  const signature = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed')
    createBookingCheckout(event.data.object);

  res.status(200).json({ received: true });
};

exports.createBooking = factory.createOne(Booking);
exports.getBooking = factory.getOne(Booking);
exports.getAllBookings = factory.getAll(Booking);
exports.updateBooking = factory.updateOne(Booking);
exports.deleteBooking = factory.deleteOne(Booking);
