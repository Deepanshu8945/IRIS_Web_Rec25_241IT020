import React, { useEffect } from "react";
import { Users, PieChart, Settings, ClipboardList, CalendarDays } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useRequestStore } from "../store/useRequestStore";
import { Link } from "react-router-dom";
import { useBookingStore } from "../store/useBookingStore";


const AdminDashboard = () => {
    const {users,getUsers} = useAuthStore();
    const {requests,fetchRequests ,acceptRequest , rejectRequest} = useRequestStore();
    const {bookings,fetchBookings , acceptBooking , rejectBooking} = useBookingStore();

    useEffect(()=>{
        getUsers()
        fetchRequests()
        fetchBookings()
    },[getUsers,fetchBookings,fetchRequests])
    
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-8">
  <h1 className="text-4xl font-bold mb-10 text-gray-800 text-center">Admin Dashboard</h1>

  {/* ✅ Stats Section */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
    <Link to= "/users">
    <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between transition transform hover:scale-105 hover:shadow-xl">
      <div>
        <h2 className="text-lg font-semibold text-gray-600">Total Users</h2>
        <p className="text-3xl font-bold">{users.length}</p>
      </div>
      <Users className="w-14 h-14 text-blue-500" />
    </div>
    </Link>

    <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between transition transform hover:scale-105 hover:shadow-xl">
      <div>
        <h2 className="text-lg font-semibold text-gray-600">Pending Requests</h2>
        <p className="text-3xl font-bold">{requests.
        filter((req)=> req.status==="pending").length}</p>
      </div>
      <ClipboardList className="w-14 h-14 text-green-500" />
    </div>

    <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between transition transform hover:scale-105 hover:shadow-xl">
      <div>
        <h2 className="text-lg font-semibold text-gray-600">Pending Bookings</h2>
        <p className="text-3xl font-bold">{bookings.
      filter((booking)=> booking.status==="pending").length}</p>
      </div>
      <PieChart className="w-14 h-14 text-yellow-500" />
    </div>
  </div>

  {/* ✅ Management Section */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    
    {/* Requests Section */}
    <div className="bg-white p-6 rounded-lg shadow-lg transition transform hover:scale-105 hover:shadow-xl">
      <h2 className="text-2xl font-semibold mb-6">Pending Requests</h2>

      {/* ✅ Table Header */}
      <div className="grid grid-cols-4 gap-4 font-semibold p-4 bg-gray-200 rounded-md">
        <span className="text-gray-600">Name</span>
        <span className="text-gray-600">Quantity</span>
        <span className="text-gray-600">User</span>
        <span className="text-gray-600">Actions</span>
      </div>

      {/* ✅ Request Rows */}
      {requests
      .filter((req)=> req.status === "pending")
      .map((req, index) => (
        <div 
          key={index} 
          className={`grid grid-cols-4 gap-4 items-center p-4 border-b transition ${index % 2 === 0 ? 'bg-gray-50' : 'bg-gray-100'} hover:bg-blue-50`}
        >
          <span className="text-gray-700">{req.equipment.name}</span>
          <span className="text-gray-700">{req.quantity}</span>
          <span className="text-gray-700">{req.user.name}</span>
          
          {/* ✅ Button Group with Containment */}
          <div className="flex gap-2 items-center justify-center w-full">
            <button 
              onClick={() => acceptRequest(req._id)} 
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-md transition"
            >
              Accept
            </button>
            <button 
              onClick={() => rejectRequest(req._id)} 
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transition"
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>

    {/* Bookings Section */}
    <div className="bg-white p-6 rounded-lg shadow-lg transition transform hover:scale-105 hover:shadow-xl">
      <h2 className="text-2xl font-semibold mb-6">Pending Bookings</h2>

      {/* ✅ Table Header */}
      <div className="grid grid-cols-4 gap-4 font-semibold p-4 bg-gray-200 rounded-md">
        <span className="text-gray-600">Name</span>
        <span className="text-gray-600">User</span>
        <span className="text-gray-600">Timing</span>
        <span className="text-gray-600">Actions</span>
      </div>

      {/* ✅ Bookings Rows */}
      {bookings
      .filter((booking)=> booking.status === "pending")
      .map((booking, index) => (
        <div 
          key={index} 
          className={`grid grid-cols-4 gap-4 items-center p-4 border-b transition ${index % 2 === 0 ? 'bg-gray-50' : 'bg-gray-100'} hover:bg-blue-50`}
        >
          <span className="text-gray-700">{booking.infrastructure.name}</span>
          <span className="text-gray-700">{booking.user.name}</span>
          <span 
            className={`text-sm font-semibold px-3 py-1 rounded-md ${booking.status === "approved" ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-600"}`}
          >
            {`${booking.startTime}-${booking.endTime}`}
          </span> 
          <div className="flex gap-2 items-center justify-center w-full">
            <button 
              onClick={() => acceptBooking(booking._id)} 
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-md transition"
            >
              Accept
            </button>
            <button 
              onClick={() => rejectBooking(booking._id)} 
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transition"
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
    </div>
</div>

  );
};

export default AdminDashboard;
