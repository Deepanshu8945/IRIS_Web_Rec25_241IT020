import express from "express"
import { adminOnly, protect } from "../middlewares/authMiddleware.js"
import { acceptBooking, createBooking, getBookings, getUserBookings, rejectBooking } from "../controllers/booking.controller.js"

const router = express.Router()

router.post("/book" , protect , createBooking)
router.get("/bookings" , protect,adminOnly , getBookings)
router.get("/bookings/:id" , protect, getUserBookings)
router.post("/accept" , protect , adminOnly , acceptBooking)
router.post("/reject" , protect , adminOnly , rejectBooking)

export default router

