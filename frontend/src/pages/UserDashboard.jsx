import React, { useEffect } from "react";
import { CalendarCheck, Book, UserCircle, Clock, Ticket } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useRequestStore } from "../store/useRequestStore";
import { useBookingStore } from "../store/useBookingStore";

const UserDashboard = () => {
  const { authUser } = useAuthStore();
  const { userRequests, fetchUserRequests } = useRequestStore();
  const { userBookings, fetchUserBookings } = useBookingStore();

  useEffect(() => {
    fetchUserRequests();
    fetchUserBookings();
  }, [fetchUserRequests, fetchUserBookings]);
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">User Dashboard</h1>

      {/* ✅ User Info Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6 transition transform ">
        <h2 className="text-2xl font-semibold mb-4">Profile Info</h2>
        <div className="flex items-center space-x-6">
          <UserCircle className="w-12 h-12 text-blue-500" />
          <div>
            <p className="text-lg font-bold">{authUser.name}</p>
            <p className="text-gray-600">{authUser.email}</p>
          </div>
        </div>
      </div>

      {/* ✅ Status Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Requests */}
        <div className="bg-white p-6 rounded-lg shadow-md transition transform hover:scale-105 hover:shadow-xl">
          <h2 className="text-xl font-semibold mb-4">Requests</h2>
          <div className="flex flex-col gap-2 justify-between ">
            <div className="grid grid-cols-5 gap-4 font-semibold p-4 bg-gray-200 rounded-md">
              <span className="text-gray-600">Name</span>
              <span className="text-gray-600">Quantity</span>
              <span className="text-gray-600">Status</span>
              <span className="text-gray-600">Start</span>
              <span className="text-gray-600">End</span>
            </div>
            {userRequests?.length > 0 ? (
              userRequests.map((req, index) => (
                <div key={index} className="p-4 border-b grid grid-cols-5">
                  <span className="text-gray-600">{req.equipment?.name}</span>
                  <span className="text-gray-600">{req.quantity}</span>
                  <span className="text-gray-600">{req.status}</span>
                  <span className="text-gray-600">
                    {new Date(req.startDate).toLocaleDateString()}
                  </span>
                  <span className="text-gray-600">
                    {new Date(req.endDate).toLocaleDateString()}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No Requests found.</p>
            )}
          </div>
        </div>

        {/* Bookings */}
        <div className="bg-white p-6 rounded-lg shadow-md transition transform hover:scale-105 hover:shadow-xl">
          <h2 className="text-xl font-semibold mb-4">Bookings</h2>
          <div className="flex flex-col gap-2 justify-between">
            <div className="grid grid-cols-4 gap-4 font-semibold p-4 bg-gray-200 rounded-md">
              <span className="text-gray-600">Name</span>
              <span className="text-gray-600">Status</span>
              <span className="text-gray-600">Start</span>
              <span className="text-gray-600">End</span>
            </div>
            {userBookings?.length > 0 ? (
              userBookings.map((b, index) => (
                <div key={index} className="p-4 border-b grid grid-cols-4">
                  <span className="text-gray-600">{b.infrastructure.name}</span>
                  <span className="text-gray-600">{b.status}</span>
                  <span className="text-gray-600">{b.startTime}</span>
                  <span className="text-gray-600">{b.endTime}</span>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No Bookings found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
