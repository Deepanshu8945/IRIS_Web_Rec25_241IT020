import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";

export const useEquipmentStore = create((set,get) => ({
  equipment: [],

  fetchEquipment: async () => {
    try {
      const res = await axiosInstance.get("/equipment/getEquipments");
      set({ equipment: res.data });
    } catch (error) {
      console.error("Error fetching equipment:", error);
    }
  },

  addRequest: async (data) => {
    try {
      console.log(data);
      
      await axiosInstance.post("/req/request", data );
      toast.success("Request added successfully!");
    } catch (error) {
      console.error("Error adding request:", error);
      toast.error("Failed to add request.");
    }
  },

  addEquipment: async (data) => {
    try {
      await axiosInstance.post("/equipment/add", data);
      toast.success("Equipment added successfully!");
      set((state) => ({
        equipment: [...state.equipment, data],
      }));
    } catch (error) {
      console.error("Error adding equipment:", error);
      toast.error("Failed to add equipment.");
    }
  },
  deleteEquipment: async(id)=>{
    try {
      await axiosInstance.delete(`/equipment/delete/${id}`);
      toast.success("Equipment deleted successfully");
      set((state) => ({
        equipment: state.equipment.filter((item) => item._id !== id)
      }));
    } catch (error) {
      console.error("Error deleting equipment:", error);
      toast.error("Failed to add equipment.");
    }
  },
  updateEquipment: async(data)=>{
    try {
      await axiosInstance.put("/equipment/update" , data);
      toast.success("Equipment changed succesfully");
      get().fetchEquipment()
    } catch (error) {
      console.error("Error updating equipment:", error);
      toast.error("Failed to update equipment.");
    }
  }
}));
