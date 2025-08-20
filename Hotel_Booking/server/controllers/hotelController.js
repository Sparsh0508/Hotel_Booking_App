import Hotel from "../models/Hotel.js";
import User from "../models/User.js";

export const registerHotel = async(req,res) => {
    try {
        const {name,address,contact,city} = req.body
        const owner = req.user._id

        //check if user is already registered
        const hotel = await Hotel.findOne({owner})
        if(hotel){
            return req.json({
                    success:false,
                    message:"Hotel Already registered"
                })
        }
        await Hotel.create({name,address,contact,city,owner});

        await User.findById(owner,{role:"Hotel Owner"})

        res.json({
            success:true,
            message:"Hotel Registered Successfully"
        })

    } catch (error) {
         res.json({
            success:false,
            message:error.message
        })
    }    
}