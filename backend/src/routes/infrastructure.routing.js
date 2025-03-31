import express from "express"
import { adminOnly, protect } from "../middlewares/authMiddleware.js"
import { createInfra, deleteInfra, getInfra, updateInfra } from "../controllers/infrastructure.controller.js"

const router = express.Router()

router.post("/create" , protect,adminOnly,createInfra)
router.put("/update" , protect,adminOnly,updateInfra)
router.get("/getInfra" , protect,getInfra)
router.delete("/delete/:id", protect,adminOnly,deleteInfra)

export default router;