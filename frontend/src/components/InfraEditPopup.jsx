import React, { useState } from "react";
import { useInfraStore } from "../store/useInfraStore";

function InfraEditPopup({ handleClose, infra }) {
  const [availability, setAvailability] = useState(false);
  const [capacity, setCapacity] = useState("");

  const { updateInfra } = useInfraStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    updateInfra({
      name: infra.name,
      availability,
      capacity,
    });
    setAvailability();
    setCapacity("");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Edit Infrastructure</h2>

        <form onSubmit={handleSubmit}>
          {/* Availability */}
          <label className="block text-gray-700">Availability</label>
          <select
            value={availability}
            onChange={(e) => setAvailability(e.target.value === "true")}
            className="w-full border p-2 rounded mb-4"
          >
            <option value="">Select Availability</option>
            <option value="true">Available</option>
            <option value="false">Unavailable</option>
          </select>

          {/* capacity */}
          <label className="block text-gray-700">Capacity</label>
          <input
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            className="w-full border p-2 rounded mb-4"
            placeholder="Enter Capacity"
            min="1"
          />

          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default InfraEditPopup;
