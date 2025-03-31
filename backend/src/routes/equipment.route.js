import express from "express"
import { adminOnly, protect } from "../middlewares/authMiddleware.js"
import {addEquipment, deleteEquipment, getEquipments, updateEquipment } from "../controllers/equipment.controller.js"
const router = express.Router()

router.post("/add" ,protect,adminOnly, addEquipment)
router.put("/update" ,protect,adminOnly, updateEquipment)
router.get("/getEquipments" ,protect, getEquipments)
router.delete("/delete/:id", protect,adminOnly , deleteEquipment)
export default router;