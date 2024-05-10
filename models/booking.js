const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bookingSchema = new Schema({
    booking_name:{
        type:String,
        required:true,
    },
    check_in_date:{
        type: Date,
        required:true,
    },
    check_out_date:{
        type:Date,
        required:true,
    },
    number_of_guest:{
        type:Number,
        min:1,
        max:4,
        required:true,
    },
    room_type:{
        type:String,
        enum:['normal','suplex'],
        required:true,   
    },
    total_amount:{
        type:Number,
        required:true,
        default:0,
    },
    booking_status:{
        type:String,
        default:"pending",
        enum:["pending","accepted","declined"],
    },
    booking_owner:{
        type: Schema.Types.ObjectId,
        ref: "User",
     
    },
});
module.exports = mongoose.model("Booking",bookingSchema);