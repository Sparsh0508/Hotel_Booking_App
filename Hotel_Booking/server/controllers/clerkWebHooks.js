import User from "../models/User.js"
import { Webhook } from "svix"

const clerkWebHooks = async(req,res) => {
    try {
        const whook = new Webhook(process.env.CLERK_WEBHOOKS_SECRET)

        const headers = {
            "svix-id":req.headers["svix-id"],
            "svix-timestamp":req.headers["svix-timestamps"],
            "svix-signature":req.headers["svix-signature"]
        };
        await whook.verify(JSON.stringify(req.body),headers)

        const {data,type} = req.body

        const userData = {
            _id: data.id,
            email:data.emailaddress[0].email_address,
            username: data.first_name +" " + data.last_name,
            image: data.image_url,
        }
        switch (type) {
            case "user.created":{
                await User.create(userData);
                break;
            }
            case "user.updated":{
                await User.findByIdAndUpdate(data.id,userData);
                break;
            }
            case "user.deleted":{
                await User.findByIdAndDelete(data.id,userData);
                break;
            }        
            default:
                break;
        }
        res.JSON({
            success:true,
            message:"WebHook Received"
        })
    } catch (error) {
        console.log(error.message);
        res.JSON({
            success:false,
            message:error.message
        })
        
    }
}

export default clerkWebHooks;