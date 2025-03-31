import {create} from "zustand"
import { axiosInstance } from "../lib/axios.js"
import toast from "react-hot-toast"

export const useBookingStore = create ((set,get)=>({
    userBookings:[],
    bookings:[],

    fetchUserBookings: async()=>{
        try {
            const res = await axiosInstance.get("/booking/userBookings")
            set({userBookings:res.data})
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },
    fetchBookings:async()=>{
        try {
            const res = await axiosInstance.get("/booking/bookings")
            set({bookings:res.data})
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },
    acceptBooking:async(bookingId)=>{
        try {
            // console.log(bookingId);
            await axiosInstance.put("/booking/accept" ,{bookingId} )
            get().fetchBookings()
            toast.success("Booking accepted successfully")
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },
    rejectBooking:async(bookingId)=>{
        try {
            // console.log(bookingId);
            await axiosInstance.put("/booking/reject" ,{bookingId} )
            get().fetchBookings()
            toast.success("Booking rejected successfully")
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },
}))