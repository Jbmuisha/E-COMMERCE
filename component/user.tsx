"use client";

import { useState } from "react";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email:"johnDoe@gmail.com",password:"1234",role: "Admin", avatar: "/image/avatar.png" },
    { id: 2, name: "Jane Smith",email:"jane@gmail.com" , password:"20494",role: "User", avatar: "/image/avatar.png" },
  ]);

  const [newUser, setNewUser] = useState({ name: "", email:"", password:"",role: "", avatar: "" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleAddUser = () => {
    if (!newUser.name || !newUser.role) return;
    setUsers([
      ...users,
      { id: users.length + 1, name: newUser.name, password: newUser.password ,email: newUser.email,role: newUser.role, avatar: newUser.avatar || "/image/avatar.png" },
    ]);
    setNewUser({ name: "", email:"",password:"",role: "", avatar: "" });
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const url = URL.createObjectURL(e.target.files[0]);
    setNewUser({ ...newUser, avatar: url });
  };

  return (
    <div className="p-[24px] space-y-[32px]">
      <h1 className="text-[24px] font-bold">Users Management</h1>

     
      <div className="bg-white shadow-[0_4px_12px_rgba(0,0,0,0.08)] rounded-[16px] p-[24px] space-y-[16px]">
        <h2 className="font-semibold text-[18px]">Add New User</h2>
        <div className="flex flex-col md:flex-row gap-[16px] items-center">
          

          <div className="flex flex-col">
            <label className="mb-[4px] text-[12px] font-medium">Avatar</label>
            <input type="file" accept="image/*" onChange={handleAvatarUpload} className="border-[1px] border-gray-300 p-[8px] rounded-[8px] w-full md:w-[180px]" />
          </div>

          <div className="flex flex-col">
            <label className="mb-[4px] text-[12px] font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={newUser.name}
              onChange={handleInputChange}
              placeholder="Enter user name"
              className="border-[1px] border-gray-300 p-[8px] rounded-[8px] w-full md:w-[200px]"
            />

            <label className="mb-[4px] text-[12px] font-medium">email</label>
            <input type="email"
               name="email"
               value={newUser.email}
               onChange={handleInputChange}
               placeholder="Enter your email" 
               className="border-[1px] border-gray-300 p-[8px] rounded-[8px] w-full md:w-[200px]"/>

            <label className="mb-[4px] text-[12px] font-medium"> password</label>
            <input type="password"
            name="password"
            value={newUser.password}
            onChange={handleInputChange}
            placeholder="please enter your password"
            className="border-[1px] border-gray-300 p-[8px] rounded-[8px] w-full md:w-[200px]" />
          </div>

          
          <div className="flex flex-col">
            <label className="mb-[4px] text-[12px] font-medium">Role</label>
            <select
              name="role"
              value={newUser.role}
              onChange={handleInputChange}
              className="border-[1px] border-gray-300 p-[8px] rounded-[8px] w-full md:w-[160px]"
            >
              <option value="">Select role</option>
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </select>
          </div>

          <button
            onClick={handleAddUser}
            className="bg-[#0b0f19] text-white px-[16px] py-[10px] rounded-[12px] hover:bg-[#111421]"
          >
            Add User
          </button>
        </div>
      </div>

     
      <div className="bg-white shadow-[0_4px_12px_rgba(0,0,0,0.08)] rounded-[16px] p-[24px]">
        <h2 className="font-semibold text-[18px] mb-[12px]">User List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-[16px] py-[12px]">Avatar</th>
                <th className="px-[16px] py-[12px]">Name</th>
                <th className="px-[16px] py-[12px]">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="px-[16px] py-[12px]">
                    <img src={user.avatar} alt={user.name} className="w-[40px] h-[40px] rounded-[50%] object-cover" />
                  </td>
                  <td className="px-[16px] py-[12px]">{user.name}</td>
                  <td className="px-[16px] py-[12px]">{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
