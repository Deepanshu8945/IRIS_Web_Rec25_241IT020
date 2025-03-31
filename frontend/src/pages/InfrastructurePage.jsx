import React, { useEffect } from "react";
import {useInfraStore} from "../store/useInfraStore"
import InfraCard from "../components/InfraCard";
import { useAuthStore } from "../store/useAuthStore";
import AddInfrastructureForm from "../components/AddInfrastructureForm";

const InfrastructurePage = () => {
  const { admin } = useAuthStore();
  const { infrastructure, fetchInfra, addBooking } = useInfraStore();

  useEffect(() => {
    fetchInfra();
  }, [fetchInfra]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Infrastructure List</h1>

      {admin && (
        <div className="mb-6">
          <AddInfrastructureForm />
        </div>
      )}

      {/* ✅ Infra Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {infrastructure.map((infra) => (
          <InfraCard
            key={infra._id}
            infra={infra}
            addBooking={addBooking}
          />
        ))}
      </div>
    </div>
  );
};

export default InfrastructurePage;
