const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");
const Booking = require("./booking.js");
const { required } = require("joi");
const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
   url: String,
   filename: String,
  },
  price: Number,
  location: String,
  country: String,
  reviews:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Review"
  } ],
  owner : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "User",
  },
  bookings : [{
    type : mongoose.Schema.Types.ObjectId,
    ref : "Booking",
  }],
  geometry:{
    type:{
      type:String,
      enum:['Point'],
      required:true,
    },
    coordinates:{
      type:[Number],
      required:true,
    }
  },
  availability:{
    type:Boolean,
    default:true,
  },
  category:{
    type:String,
    enum : ["Rooms","Trending","Iconic Cities","Mountains","Castles","Amazing Pools","Camping","Farms","Arctic"],
  },
});
listingSchema.post("findOneAndDelete",async(listing)=>{
  if(listing){
    await Review.deleteMany({_id:{$in:listing.reviews}})
  }
});
listingSchema.post("findOneAndDelete",async(listing)=>{
  if(listing){
    await Booking.deleteMany({_id:{$in:listing.bookings}})
  }
});
const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;