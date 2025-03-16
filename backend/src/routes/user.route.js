import express from "express";
import { login,logout,signup,promoteToAdmin,getUsers } from "../controllers/user.controller.js";
import { adminOnly, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/login" , login);
router.post("/logout" , logout);
router.post("/signup" , signup);

router.get("/getUsers" , protect,adminOnly,getUsers);
router.put("/:id/promote" , protect,adminOnly,promoteToAdmin);

export default router;