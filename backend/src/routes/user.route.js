import express from "express";
import { login,logout,signup,promoteToAdmin,getUsers, checkAuth, demoteToUser } from "../controllers/user.controller.js";
import { adminOnly, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/login" , login);
router.post("/logout" , logout);
router.post("/signup" , signup);
router.get("/check" , protect,checkAuth);
router.get("/getUsers" , protect,adminOnly,getUsers);
router.put("/:id/promote" , protect,adminOnly,promoteToAdmin);
router.put("/:id/demote" , protect,adminOnly,demoteToUser);

export default router;