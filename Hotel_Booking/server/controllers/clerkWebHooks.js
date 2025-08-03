import User from "../models/User.js";
import { Webhook } from "svix";

const clerkWebHooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOKS_SECRET);

    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    await whook.verify(JSON.stringify(req.body), headers);

    const { data, type } = req.body;

    const userData = {
      _id: data.id,
      email: data.email_addresses[0].email_address,
      userName: `${data.first_name} ${data.last_name}`,
      image: data.image_url,
      recentSearchCity: [], // required field
    };

    switch (type) {
      case "user.created":
        await User.create(userData);
        console.log("✅ User created in MongoDB");
        break;

      case "user.updated":
        await User.findByIdAndUpdate(data.id, userData);
        console.log("🔄 User updated");
        break;

      case "user.deleted":
        await User.findByIdAndDelete(data.id);
        console.log("❌ User deleted");
        break;

      default:
        console.log("⚠️ Unhandled event type:", type);
        break;
    }

    res.json({
      success: true,
      message: "Webhook Received",
    });
  } catch (error) {
    console.log("❌ Webhook error:", error.message);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export default clerkWebHooks;
