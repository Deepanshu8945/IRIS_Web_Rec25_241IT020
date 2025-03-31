import express from "express"
import { adminOnly, protect } from "../middlewares/authMiddleware.js"
import { acceptRequest, rejectRequest, createRequest, getAllRequets, getUserRequests } from "../controllers/request.controller.js"
const router = express.Router()

router.post("/request" ,protect, createRequest)
router.get("/getRequests" , protect,adminOnly,getAllRequets)//gets all requests
router.get("/getUserRequests" , protect,getUserRequests)//gets only user's requests
router.put("/accept" ,protect,adminOnly, acceptRequest)
router.put("/reject" ,protect,adminOnly, rejectRequest)

export default router