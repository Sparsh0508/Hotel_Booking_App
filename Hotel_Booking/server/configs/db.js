import mongoose from "mongoose";

const connectDb = async () => {
    try {
        mongoose.connection.on('connected' ,()=>{
            console.log("database Connected");            
        })
        await mongoose.connect(`${process.env.MONGO_DB_URI}/hotel-booking`)
    } catch (error) {
        console.log(error.message);
        
    }
}

export default connectDb