import mongoose from 'mongoose';

const busScheduleSchema = mongoose.Schema({
        route_code: String,
        route_stops: String,
        departure_location: String,
        arrival_location: String,
        departure_time: String,
        arrival_time: String,
        in_between_stop:[{
            stop_point: String,
            arrival_time: String
        }],
        createdAt: {
        type: Date,
        default: new Date()
    }
})

const busSchedule = mongoose.model('busSchedule',busScheduleSchema);

export default busSchedule;