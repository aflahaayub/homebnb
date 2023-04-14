const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    require: true
  },
  place:{
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'Place'
  },
  checkIn:{
    type: Date, 
    require: true
  },
  checkOut:{
    type: Date, 
    require: true
  },
  name:{
    type: String, 
    require: true
  },
  phone:{
    type: String, 
    require: true
  },
  price: {
    type: Number
  }
})

const BookingModel = mongoose.model('Booking', bookingSchema)

module.exports = BookingModel