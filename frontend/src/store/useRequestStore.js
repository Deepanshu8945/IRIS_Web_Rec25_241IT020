import {create} from "zustand"
import { axiosInstance } from "../lib/axios.js"
import toast from "react-hot-toast"

export const useRequestStore = create ((set,get)=>({
    userRequests:[],
    requests:[],

    fetchUserRequests: async()=>{
        try {
            const res = await axiosInstance.get("/req/getUserRequests")
            set({userRequests:res.data})
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },
    fetchRequests:async()=>{
        try {
            const res = await axiosInstance.get("/req/getRequests")
            set({requests:res.data})
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },
    acceptRequest:async(requestId)=>{
        try {
            await axiosInstance.put("/req/accept" ,{requestId} )
            get().fetchRequests()
            toast.success("Request accepted successfully")
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },
    rejectRequest:async(requestId)=>{
        try {
            await axiosInstance.put("/req/reject" ,{requestId} )
            get().fetchRequests()
            toast.success("Request rejected successfully")
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}))