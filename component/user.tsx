"use client";

import { useEffect, useState } from "react";

type User = {
  _id: string;
  username: string;
  email: string;
  role: string;
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    role: "User",
  });

  const token = localStorage.getItem("token");

 
  useEffect(() => {
    fetch("/api/admin/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(setUsers);
  }, []);

  // ✅ ADD USER
  const addUser = async () => {
    const res = await fetch("/api/admin/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newUser),
    });

    const data = await res.json();
    if (res.ok) {
      setUsers([...users, data]);
      setNewUser({ username: "", email: "", password: "", role: "User" });
    }
  };

  // ✅ UPDATE ROLE
  const updateRole = async (id: string, role: string) => {
    const res = await fetch("/api/admin/users", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id, role }),
    });

    const updated = await res.json();
    setUsers(users.map(u => (u._id === id ? updated : u)));
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Admin Users</h1>

      {/* ADD USER */}
      <div className="bg-white p-4 rounded shadow space-y-2">
        <input
          placeholder="Username"
          value={newUser.username}
          onChange={e => setNewUser({ ...newUser, username: e.target.value })}
          className="border p-2 w-full"
        />
        <input
          placeholder="Email"
          value={newUser.email}
          onChange={e => setNewUser({ ...newUser, email: e.target.value })}
          className="border p-2 w-full"
        />
        <input
          placeholder="Password"
          type="password"
          value={newUser.password}
          onChange={e => setNewUser({ ...newUser, password: e.target.value })}
          className="border p-2 w-full"
        />
        <select
          value={newUser.role}
          onChange={e => setNewUser({ ...newUser, role: e.target.value })}
          className="border p-2 w-full"
        >
          <option>User</option>
          <option>Admin</option>
        </select>

        <button onClick={addUser} className="bg-black text-white px-4 py-2">
          Add User
        </button>
      </div>

      {/* USERS TABLE */}
      <table className="w-full border">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id} className="border-t">
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>
                <select
                  value={u.role}
                  onChange={e => updateRole(u._id, e.target.value)}
                >
                  <option>User</option>
                  <option>Admin</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
