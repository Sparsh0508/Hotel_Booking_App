import mongoose from "mongoose";
import Hotel from "./Hotel";

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
        ref:"Hotle",
        required:true
    },
    checkInDate: {
        type:date,
        required:true
    },
    checkOutDate: {
        type:date,
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

const Booking = mongoose.model("Booking",roomSchema);

export default Booking;