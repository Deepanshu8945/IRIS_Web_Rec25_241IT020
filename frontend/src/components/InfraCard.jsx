import React, { useState } from "react";
import { Button } from "./Button";
import { useAuthStore } from "../store/useAuthStore";
import InfraEditPopup from "./InfraEditPopup";

const InfraCard = ({ infra, addBooking }) => {
  const { admin } = useAuthStore();
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
      <h2 className="text-xl font-bold">{infra.name}</h2>
      {admin && <p className="text-gray-600">Capacity: {infra.capacity}</p>}
      <p className="text-gray-600">Start Time: {infra.operatingHours?.start}</p>
      <p className="text-gray-600">End Time: {infra.operatingHours?.end}</p>

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
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addBooking({
                infraId: infra._id,
                startTime: startTime,
                endTime: endTime,
              });
            }}
          >
            <label className="block text-gray-700">Start Time</label>
            <input
              type="time"
              name="start"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />
            <label className="block text-gray-700">End Time</label>
            <input
              type="time"
              name="end"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />
            <Button
              text="Add booking"
              className="bg-blue-500 hover:bg-blue-600"
            />
          </form>
        )}
        {isOpen && <InfraEditPopup handleClose={handleClose} infra={infra}/>}
      </div>
    </div>
  );
};

export default InfraCard;
