const mongoose = require('mongoose');
const slugify = require('slugify');

const adSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'A ad must have a title'],
      unique: true,
      trim: true,
      maxlength: [40, 'An ad title must have less or equal then 40 characters'],
      minlength: [10, 'An ad title must have more or equal then 10 characters']
    },
    slug: String,
    content: String,
    mimeType: {
      type: String,
      enum: ['image', 'video']
    },
    category: {
      type: String,
      enum: ['product', 'service', 'event', 'emergency', 'awareness'],
      default: 'product'
    },
    createdAt: {
      type: Date,
      default: Date.now()
    },
    duration: [Date],
    displayHours: {
      type: String,
      enum: ['9to5', '24h', '9to8'],
      default: '9to8'
    },
    displayDays: {
      type: String,
      enum: ['mon-fri', 'mon-sat', 'full-week'],
      default: 'mon-fri'
    },
    active: {
      type: Boolean,
      default: true
    },
    estReach: Number,
    price: Number,
    kiosks: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Kiosk'
      }
    ],
    advertiser: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Ad must belong to an advertiser']
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
adSchema.pre('save', function(next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

adSchema.pre(/^find/, function(next) {
  // this points to the current query
  this.find({ active: { $ne: false } });
  next();
});

adSchema.pre(/^find/, function(next) {
  // this.populate({
  //   path: 'kiosks',
  //   select: '-owner slug'
  // }).populate({
  //   path: 'advertiser',
  //   select: 'name'
  // });

  this.populate({
    path: 'advertiser',
    select: '-__v'
  });
  next();
});

const Ad = mongoose.model('Ad', adSchema);

module.exports = Ad;
