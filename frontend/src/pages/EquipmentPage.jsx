import React, { useEffect } from "react";
import { useEquipmentStore } from "../store/useEquipmentStore";
import EquipmentCard from "../components/EquipmentCard";
import AddEquipmentForm from "../components/AddEquipmentForm";
import { useAuthStore } from "../store/useAuthStore";

const EquipmentPage = () => {
  const { admin } = useAuthStore();
  const { equipment, fetchEquipment, addRequest, deleteEquipment} = useEquipmentStore();

  useEffect(() => {
    fetchEquipment();
  }, [fetchEquipment]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Equipment List</h1>

      {/* ✅ Admin-only Add Equipment Form */}
      {admin && (
        <div className="mb-6">
          <AddEquipmentForm />
        </div>
      )}

      {/* ✅ Equipment Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {equipment.map((eq) => (
          <EquipmentCard
            key={eq._id}
            eq={eq}
            addRequest={addRequest}
            deleteEquipment = {deleteEquipment}
          />
        ))}
      </div>
    </div>
  );
};

export default EquipmentPage;
