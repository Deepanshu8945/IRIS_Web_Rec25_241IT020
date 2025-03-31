import React, { useState } from "react";
import { Button } from "./Button";
import { useEquipmentStore } from "../store/useEquipmentStore";


const conditionOptions = [
  { value: 'New', label: 'New' },
  { value: 'Good', label: 'Good' },
  { value: 'Fair', label: 'Fair' },
  { value: 'Damaged', label: 'Damaged' },
];

const availabilityOptions = [
  { value: 'available', label: 'Available' },
  { value: 'not available', label: 'Not available' },
  { value: 'under maintenance', label: 'Maintenance' },
];

const AddEquipmentForm = () => {
  const { addEquipment } = useEquipmentStore();
  const [data, setData] = useState({
    name:"",
    condition:"",
    category:"",
    availability:"",
    quantity:0
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addEquipment(data);
    setData({
      name:"",
      condition:"",
      category:"",
      availability:"",
      quantity:0
    })
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="bg-white p-6 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-4">Add Equipment</h2>

      <div className="mb-4">
        <label className="block text-gray-600">Name:</label>
        <input
          type="text"
          className="w-full border p-2 rounded mb-2"
          value={data.name}
          onChange={(e) => setData({...data, name: e.target.value})}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-600">Condition:</label>
        <select
          className="w-full border p-2 rounded mb-2"
          value={data.condition}
          onChange={(e) => setData({...data, condition: e.target.value})}
          required
        >
          <option value="">Select Condition</option>
          {conditionOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-600">Category:</label>
        <input
          type="text"
          className="w-full border p-2 rounded mb-2"
          value={data.category}
          onChange={(e) => setData({...data, category: e.target.value})}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-600">Availability:</label>
        <select
          className="w-full border p-2 rounded mb-2"
          value={data.availability}
          onChange={(e) => setData({...data, availability: e.target.value})}
          required
        >
          <option value="">Select Availability</option>
          {availabilityOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-600">Quantity:</label>
        <input
          type="number"
          className="w-full border p-2 rounded mb-2"
          value={data.quantity}
          onChange={(e) => setData({...data, quantity: Number(e.target.value)})}
          required
          min="0"
        />
      </div>

      

      <Button text="Add" className="bg-green-500 hover:bg-green-600" />
    </form>
  );
};

export default AddEquipmentForm;
