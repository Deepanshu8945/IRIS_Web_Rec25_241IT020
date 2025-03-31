import React, { useState } from "react";
import { Button } from "./Button";
import { useInfraStore } from "../store/useInfraStore";



const availabilityOptions = [
  { value: true, label: 'Available' },
  { value: false, label: 'Not available' },
];

const AddInfrastructureForm = () => {
  const { addInfrastructure } = useInfraStore();
  const [data, setData] = useState({
    name:"",
    operatingHours:{
        start:"",
        end:""
    },
    location:"",
    availability:"",
    capacity:0
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addInfrastructure(data);
    setData({
      name:"",
      operatingHours:{
        start:"",
        end:""
    },
      location:"",
      availability:"",
      capacity:0
    })
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="bg-white p-6 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-4">Add Infrastructure</h2>

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

      <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700">Start Time</label>
            <input
              type="time"
              name="start"
              value={data.operatingHours.start}
              onChange={(e) => 
                setData({
                  ...data, 
                  operatingHours: {
                    ...data.operatingHours,  
                    start: e.target.value    
                  }
                })
              }
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">End Time</label>
            <input
              type="time"
              name="end"
              value={data.operatingHours.end}
              onChange={(e) => 
                setData({
                  ...data, 
                  operatingHours: {
                    ...data.operatingHours, 
                    end: e.target.value  
                  }
                })
              }
              className="w-full border p-2 rounded"
              required
            />
          </div>
        </div>


      <div className="mb-4">
        <label className="block text-gray-600">Category:</label>
        <input
          type="text"
          className="w-full border p-2 rounded mb-2"
          value={data.location}
          onChange={(e) => setData({...data, location: e.target.value})}
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
        <label className="block text-gray-600">Capacity:</label>
        <input
          type="number"
          className="w-full border p-2 rounded mb-2"
          value={data.capacity}
          onChange={(e) => setData({...data, capacity: Number(e.target.value)})}
          required
          min="0"
        />
      </div>

      

      <Button text="Add" className="bg-green-500 hover:bg-green-600" />
    </form>
  );
};

export default AddInfrastructureForm;
