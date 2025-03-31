import React, { useState } from "react";
import { useEquipmentStore } from "../store/useEquipmentStore";

function EditPopup({ handleClose ,eq}) {
  const [availability, setAvailability] = useState("");
  const [quantity, setQuantity] = useState("");
  const [condition, setCondition] = useState("");

  const {updateEquipment} = useEquipmentStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    updateEquipment({
      name: eq.name,
      availability,quantity,condition
    });
    setAvailability("");
    setQuantity("");
    setCondition("");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Edit Equipment</h2>

        <form
          onSubmit={handleSubmit}
        >
          {/* Availability */}
          <label className="block text-gray-700">Availability</label>
          <select
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
            className="w-full border p-2 rounded mb-4"
          >
            <option value="">Select Availability</option>
            <option value="true">Available</option>
            <option value="false">Unavailable</option>
          </select>

          {/* Quantity */}
          <label className="block text-gray-700">Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full border p-2 rounded mb-4"
            placeholder="Enter Quantity"
            min="1"
          />

          {/* Condition */}
          <label className="block text-gray-700">Condition</label>
          <select
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            className="w-full border p-2 rounded mb-4"
          >
            <option value="">Select Condition</option>
            <option value="New">New</option>
            <option value="Good">Good</option>
            <option value="Fair">Fair</option>
            <option value="Damaged">Damaged</option>
          </select>

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

export default EditPopup;
