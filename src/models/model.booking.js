'use strict'

import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
    username:String,
    date:Date,
    from:String,
    to:String,
    start:String,
    arrive:String,
    route_name:String
});

const BookingModel = mongoose.model('Bookings', BookingSchema);
export default BookingModel;