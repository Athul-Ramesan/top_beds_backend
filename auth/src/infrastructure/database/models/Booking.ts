const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  property: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Property', 
    required: true 
  },
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  guests: { 
    type: Number, 
    required: true 
  },
  startDate: { 
    type: Date, 
    required: true 
  },
  endDate: { 
    type: Date, 
    required: true 
  },
  totalPrice: { 
    type: Number, 
    required: true 
  },
  paymentStatus: { 
    type: String, 
    enum: ['Pending', 'Paid'], 
    default: 'Pending' 
  },
  paymentIntentId: { 
    type: String 
  },
  bookingStatus: {
    type: String,
    enum: ['Pending', 'Accepted'],
  }
}, { 
  timestamps: true 
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
