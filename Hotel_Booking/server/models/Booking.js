import mongoose from "mongoose";
import Hotel from "./Hotel.js";

const bookingSchema = new mongoose.Schema({
    user: {
        type:String,
        ref: "User",
        required:true
    },
    room: {
        type:String,
        ref:"Room",
        required:true
    },    
    room: {
        type:String,
        ref:"Hotel",
        required:true
    },
    checkInDate: {
        type:Date,
        required:true
    },
    checkOutDate: {
        type:Date,
        required:true
    },
    totalPrice:{
        type:Number,
        required:true
    },
    guests:{
        type:Number,
        required:true
    },
    Status:{
        type:String,
        enum:["pending","confirmed","cancelled"],
        default:"pending",
    },
    paymentMethod:{
        type:String,
        required:true,
        default: "Pay At Hotel",
    },
    isPaid:{
        type:Boolean,
        default:false
    }
},
{
    timestamps:true
})

const Booking = mongoose.model("Booking",bookingSchema);

export default Booking;