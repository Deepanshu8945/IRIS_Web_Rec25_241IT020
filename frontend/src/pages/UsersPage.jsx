import React, { useEffect } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Button } from '../components/Button';

function UsersPage() {
    const {users,getUsers,promoteUser,demoteAdmin,authUser} = useAuthStore();
    useEffect(()=>{
        getUsers();
    },[getUsers])
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg transition transform">
      <h2 className="text-2xl font-semibold mb-6">Users</h2>

      {/* ✅ Table Header */}
      <div className="grid grid-cols-4 gap-4 font-semibold p-4 bg-gray-200 rounded-md">
        <span className="text-gray-600">Name</span>
        <span className="text-gray-600">Branch</span>
        <span className="text-gray-600">Status</span>
        <span className="text-gray-600">Actions</span>
      </div>

      {/* ✅ Users Rows */}
      {users
      .filter((user)=> user._id !== authUser._id)
      .map((user, index) => (
        <div 
          key={index} 
          className={`grid grid-cols-4 gap-4 items-center p-4 border-b transition ${index % 2 === 0 ? 'bg-gray-50' : 'bg-gray-100'} hover:bg-blue-50`}
        >
          <span className="text-gray-700">{user.name}</span>
          <span className="text-gray-700">{user.branch}</span>
          <span className="text-gray-700">{user.role}</span>
          <span className="flex gap-2 ">
            <Button text="Promote" onClick={()=> promoteUser(user._id)} className='bg-red-500 hover:bg-red-600 text-white'/>
            <Button text="Demote" onClick={()=> demoteAdmin(user._id)} className='bg-red-500 hover:bg-red-600 text-white'/>

            </span>
        </div>
      ))}
    </div>
  )
}

export default UsersPage
