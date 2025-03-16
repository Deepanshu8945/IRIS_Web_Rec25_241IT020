import express from "express"

const router = express.Router()

router.post("/add" , addEquipment)
router.put("/update" , updateEquipment)
router.get("/")