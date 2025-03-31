import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";

export const useInfraStore = create((set,get) => ({
  infrastructure: [],

  fetchInfra: async () => {
    try {
      const res = await axiosInstance.get("/infra/getInfra");
      set({ infrastructure: res.data });
    } catch (error) {
      console.error("Error fetching infrastructure:", error);
    }
  },

  addBooking: async (data) => {
    try {
      await axiosInstance.post("/booking/book", data );
      toast.success("Booking added successfully!");
    } catch (error) {
      console.error("Error adding request:", error);
      toast.error("Failed to add request.");
    }
  },

  addInfrastructure: async (data) => {
    try {
      await axiosInstance.post("/infra/create", data);
      toast.success("infrastructure added successfully!");
      set((state) => ({
        infrastructure: [...state.infrastructure, data],
      }));
    } catch (error) {
      console.error("Error adding infrastructure:", error);
      toast.error("Failed to add infrastructure.");
    }
  },
  deleteInfra: async(id)=>{
    try {
      await axiosInstance.delete(`/infra/delete/${id}`);
      toast.success("Infrastructure deleted successfully");
      set((state) => ({
        infrastructure: state.infrastructure.filter((item) => item._id !== id)
      }));
    } catch (error) {
      console.error("Error deleting infrastructure:", error);
      toast.error("Failed to add infrastructure.");
    }
  },
  updateInfra : async(data)=>{
    try {
      await axiosInstance.put("infra/update" , data);
      toast.success("Infrastructure changed succesfully");
      get().fetchInfra();
    } catch (error) {
      console.error("Error updating Infra:", error);
      toast.error("Failed to update Infra.");
    }
  }
}));
