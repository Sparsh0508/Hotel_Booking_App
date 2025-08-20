import express, { Router } from "express"
import { protect } from "../middleware/authMiddleware";
import { registerHotel } from "../controllers/hotelController";

const hotelRouter = Router();

hotelRouter.post('/',protect,registerHotel)

export default hotelRouter;