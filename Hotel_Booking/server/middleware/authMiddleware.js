// // // import User from "../models/User.js"

// // // //Midleware is used to check if user is authenticated

// // // export const protect = async(req,res,next) => {
// // //     const {userId} = req.auth;
// // //     if(!userId){
// // //         res.json({
// // //             success:false,
// // //             message :"Not Authorized"
// // //         })
// // //     }else{
// // //         const user = await User.findById(userId)
// // //         req.user = user;
// // //         next()
// // //     }
// // // } 
// import { getAuth } from "@clerk/express";
// import User from "../models/User.js";

// export const protect = async (req, res, next) => {
//   const { userId } = getAuth(req);

//   if (!userId) {
//     return res.status(401).json({
//       success: false,
//       message: "Not Authorized",
//     });
//   }

//   const user = await User.findById(userId);
//   req.user = user;
//   next();
// };

// // import { getAuth } from "@clerk/express";
// // import User from "../models/User.js";

// // // Middleware to protect routes
// // export const protect = async (req, res, next) => {
// //   try {
// //     // Extract userId from Clerk token
// //     const { userId } = getAuth(req);
// //     console.log(userId);
    
// //     // If no userId, unauthorized
// //     if (!userId) {
// //       return res.status(401).json({
// //         success: false,
// //         message: "Not Authorized. Token missing or invalid.",
// //       });
// //     }

// //     // Find the user in MongoDB
// //     const user = await User.findById(userId);

// //     // If user not found in DB
// //     if (!user) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "User not found in database",
// //       });
// //     }

// //     // Attach user object to request for downstream routes
// //     req.user = user;

// //     // Proceed to next middleware/route
// //     next();
// //   } catch (error) {
// //     console.error("Auth Middleware Error:", error.message);
// //     res.status(500).json({
// //       success: false,
// //       message: "Server Error",
// //     });
// //   }
// // };


// import User from "../models/User.js";

// // Middleware to check if user is authenticated
// export const protect = async (req, res, next) => {
//   const { userId } = req.auth();
//   if (!userId) {
//     res.json({ success: false, message: "not authenticated" });
//   } else {
//     const user = await User.findById(userId);
//     req.user = user;
//     next();
//   }
// };

import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ success: false, message: "Not Authorized, no token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    req.user = user; // ✅ only attach if not null
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Not Authorized, token failed" });
  }
};
