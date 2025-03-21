import express from "express"
import { adminOnly, protect } from "../middlewares/authMiddleware.js"
import { createInfra, getInfra, updateInfra } from "../controllers/infrastructure.controller.js"

const router = express.Router()

router.post("/create" , protect,adminOnly,createInfra)
router.put("/update" , protect,adminOnly,updateInfra)
router.get("/getInfra" , protect,adminOnly,getInfra)

export default router;