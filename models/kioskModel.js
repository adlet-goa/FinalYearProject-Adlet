const mongoose = require('mongoose');
const slugify = require('slugify');

const kioskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A kiosk must have a name'],
      unique: true,
      trim: true,
      maxlength: [
        40,
        'A kiosk name must have less or equal then 40 characters'
      ],
      minlength: [10, 'A kiosk name must have more or equal then 10 characters']
    },
    slug: String,
    screenSize: Number,
    location: {
      // GeoJSON
      type: {
        type: String,
        default: 'Point',
        enum: ['Point']
      },
      coordinates: [Number],
      address: String,
      description: String
    },
    owner: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    active: {
      type: Boolean,
      default: false
    },
    operatingHours: {
      type: String,
      enum: ['9to5', '24h', '9to8'],
      default: '9to8'
    },
    operatingDays: {
      type: String,
      enum: ['mon-fri', 'mon-sat', 'full-week'],
      default: 'mon-fri'
    },
    full: {
      type: Boolean,
      default: false
    },
    maxSlot: {
      type: Number,
      default: 12
    },
    usedSlot: {
      type: Number,
      default: 0
    },
    subscription: {
      type: Number,
      default: 100
    },
    estReach: {
      type: Number,
      default: 200
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

kioskSchema.index({ slug: 1 });
kioskSchema.index({ location: '2dsphere' });

// Virtual populate
kioskSchema.virtual('ads', {
  ref: 'Ad',
  foreignField: 'kiosks',
  localField: '_id'
});

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
kioskSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// QUERY MIDDLEWARE
kioskSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'owner',
    select: '-__v'
  });

  next();
});

const Kiosk = mongoose.model('Kiosk', kioskSchema);

module.exports = Kiosk;
