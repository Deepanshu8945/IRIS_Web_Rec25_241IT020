import {create} from "zustand"
import { axiosInstance } from "../lib/axios.js"
import toast from "react-hot-toast"

export const useAuthStore = create((set,get) => ({
    authUser:null,
    admin:false,
    isSigningUp:false,
    isLoggingIn:false,
    isCheckingAuth:true,
    users:[],
    checkAuth: async() => {
        try {
            const res = await axiosInstance.get("/user/check")
            if(res.data.role === "admin") set({admin:true})
            set({authUser:res?.data || null})
        } catch (error) {
            console.log("Error in checkAuth", error);
            
            set({authUser:null})
        }
        finally{
            set({isCheckingAuth:false})
        }
    },

    signup: async(data)=>{
        set({isSigningUp:true})

        try {
            const res = await axiosInstance.post("/user/signup", data);
            set({authUser: res.data});

            toast.success("Account created successfully");
        } catch (error) {
            toast.error(error.response.data.message)
        }
        finally{
            set({isSigningUp:false})
        }
    },

    login: async(data)=>{
        set({isLoggingIn:true})
        try {
            const res = await axiosInstance.post("/user/login", data)
            if(res.data.role == "admin") set({admin:true});
            set({authUser:res.data})
            toast.success("Logged in successfully")

        } catch (error) {
            toast.error(error.response.data.message)

        }
        finally{
            set({isLoggingIn:false})
        }
    },

    logout: async()=>{
        try {
            await axiosInstance.post("/user/logout");
            set({authUser:null})
            set({admin:false})
            toast.success("Loggedout successfully")
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },
    getUsers:async()=>{
        try {
            const res = await axiosInstance.get("/user/getUsers")
            set({users: res.data})
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },
    promoteUser : async(userId)=>{
        try {
            await axiosInstance.put(`/user/${userId}/promote`);
            get().getUsers()
            toast.success("User is promoted to admin")
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },
    demoteAdmin : async(userId)=>{
        try {
            await axiosInstance.put(`/user/${userId}/demote`);
            toast.success("Admin is demoted to user")
            get().getUsers()
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}))