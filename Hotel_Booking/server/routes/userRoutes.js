import express, { Router } from "express"
import { protect } from "../middleware/authMiddleware.js";
import { getUserData, storeRecentSearchedCities } from "../controllers/userControllers.js";

const userRouter = Router();

userRouter.get('/',protect,getUserData);
userRouter.post('/store-recent-search',protect,storeRecentSearchedCities);


export default userRouter