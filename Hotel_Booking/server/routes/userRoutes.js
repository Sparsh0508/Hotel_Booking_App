import express, { Router } from "express"
import { protect } from "../middleware/authMiddleware";
import { getUserData, storeRecentSearchedCities } from "../controllers/userControllers";

const userRouter = Router();

userRouter.get('/',protect,getUserData);
userRouter.post('/store-recent-search',protect,storeRecentSearchedCities);


export default userRouter