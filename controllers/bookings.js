const Listing =  require("../models/listing");
const Booking = require("../models/booking.js");

module.exports.getBookingForm = async(req,res)=>{
    let{id} = req.params;
    let listing = await Listing.findById(id);
    res.render("bookingForm.ejs",{listing});
};
module.exports.postBooking = async(req,res)=>{
    let{id} = req.params;
    let listing = await Listing.findById(id);
    let newBooking = new Booking(req.body.booking);
    const checkInDateString = req.body.booking.check_in_date;
    const checkOutDateString = req.body.booking.check_out_date;
    const checkInDate = new Date(checkInDateString);
    const checkOutDate = new Date(checkOutDateString);
    const differenceInMs = checkOutDate - checkInDate;
    let differenceInDays = differenceInMs / (1000 * 60 * 60 * 24);
    let price = listing.price;
    if(differenceInDays===0){
        differenceInDays = differenceInDays+1;
    }
    if(req.body.booking.room_type==="normal"){
        const totalAmount = differenceInDays * price* 1.18;
        newBooking.total_amount = totalAmount;
    }else{
        price+=200;
        const totalAmount = (differenceInDays) * price* 1.18;
        newBooking.total_amount = totalAmount;
    }
    newBooking.booking_owner = req.user._id;
    newBooking.listing_owner = id;
    listing.bookings.push(newBooking);
    const bookingId = newBooking._id.toString();
    console.log(bookingId);
    await newBooking.save();
    await listing.save();
    console.log(newBooking);
    req.flash("success","new booking created!");
    res.redirect(`/listings/${listing._id}/payment/${bookingId}`);
};
module.exports.bookingsbyme = async(req,res)=>{
    const userId = req.user._id.toString();
    const allListings = await Listing.find({}).populate("bookings");
    const listings = allListings.filter(listing =>
      listing.bookings.some(booking => booking.booking_owner.toString() === userId)
    );
    res.render("bookingbyme.ejs",{listings});
};
module.exports.bookingforme = async(req,res)=>{
    const user = req.user._id.toString();
    const allListings = await Listing.find({
     $and: [
       { owner: `${user}` },
       { bookings: { $exists: true, $ne: [] } } 
     ]
   }).populate("bookings");
    res.render("bookingforme.ejs",{allListings});
 };
module.exports.bookingPayments = async(req,res)=>{
    let{id,bookingId} = req.params;
    let listing = await Listing.findById(id);
    let booking = await Booking.findById(bookingId);
    res.render("payment.ejs",{booking,listing});
};
module.exports.updateStatus= async(req,res)=>{
    const {id} = req.params;
    let status = req.body.status;
    let booking = await Booking.findById(id);
    booking.booking_status = status;
    await booking.save();
    req.flash("success","status updated!");
    res.redirect("/listings/bookingsforme");
};
module.exports.geteditbooking = async(req,res)=>{
    let{id} = req.params;
    let booking = await Booking.findById(id);
    console.log(booking);
    res.render("editbooking.ejs",{booking});
};
module.exports.updatebooking = async(req,res)=>{
    let{id} = req.params;
    let booking =  await Booking.findByIdAndUpdate(id,{...req.body.booking});
    await booking.save();
    req.flash("success","booking updated");
    res.redirect("/listings/bookingsbyme");
};
module.exports.destroybooking = async(req,res)=>{
    let {bookId,id} = req.params;
    await Booking.findByIdAndDelete(bookId);
    await Listing.findByIdAndUpdate(id,{$pull:{bookings:bookId}});
    req.flash("success","Booking Cancelled");
   res.redirect(`/listings/bookingsbyme`);
};