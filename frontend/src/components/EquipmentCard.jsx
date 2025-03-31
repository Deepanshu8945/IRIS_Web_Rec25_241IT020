import React, { useState } from "react";
import { Button } from "./Button";
import { useAuthStore } from "../store/useAuthStore";
import EditPopup from "./EditPopup";

const EquipmentCard = ({ eq, addRequest }) => {
  const { admin } = useAuthStore();
  const [quantity,setQuantity] = useState(0);
  const [start,setStart] = useState("");
  const [end,setEnd] = useState("");

  const [isOpen , setIsOpen] = useState(false);
  const handleOpen =()=> setIsOpen(true);
  const handleClose =()=> setIsOpen(false);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
      <h2 className="text-xl font-bold">{eq.name}</h2>
      {admin && (<p className="text-gray-600">Quantity: {eq.quantity}</p>)}
      {admin && (<p className="text-gray-600">Availability: {eq.availability}</p>)}
      {admin && (<p className="text-gray-600">Condition: {eq.condition}</p>)}

      <div className="flex justify-between items-center mt-4">
        {admin ? (
          <div className="flex gap-2">
            <Button
              text="Edit"
              onClick={handleOpen}
              className="bg-yellow-500 hover:bg-yellow-600"
            />
          </div>
          ) : (
          <form onSubmit={(e) => {
            e.preventDefault();
            addRequest({equipmentId: eq._id, quantity:Number(quantity) , startDate: start,endDate:end});
          }}>
            <label className="block text-gray-700">Quantity: </label>
            <input
            type="number"
            className="w-full border p-2 rounded mb-2"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            min="0"
            />

            <label className="block text-gray-700">Start Time</label>
            <input
              type="date"
              name="start"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />
            <label className="block text-gray-700">End Time</label>
            <input
              type="date"
              name="end"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />

          <Button
            text="Add Request"
            className="bg-blue-500 hover:bg-blue-600 my-2"
          />
          </form>
          )
        }
        {isOpen&& <EditPopup handleClose={handleClose} eq = {eq}/>}
      </div>
    </div>
  );
};

export default EquipmentCard;
