"use client";

import { useEffect, useState } from "react";

type User = {
  _id: string;
  username: string;
  email: string;
  role: "admin" | "user";
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // ✅ Fetch all users
  useEffect(() => {
    if (!token) return;

    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/admin/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch users");

        const data: User[] = await res.json();
        setUsers(data);
      } catch (err: any) {
        setError(err.message || "Error loading users");
      }
    };

    fetchUsers();
  }, [token]);

  // ✅ Add user
  const addUser = async () => {
    if (!token) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...newUser, role: newUser.role.toLowerCase() }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to add user");

      setUsers([...users, data]);
      setNewUser({ username: "", email: "", password: "", role: "user" });
    } catch (err: any) {
      setError(err.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Update role
  const updateRole = async (id: string, role: string) => {
    if (!token) return;

    try {
      const res = await fetch("/api/admin/users", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id, role: role.toLowerCase() }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to update role");
      }

      const updated = await res.json();
      setUsers(users.map(u => (u._id === id ? updated : u)));
    } catch (err: any) {
      setError(err.message || "Server error");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Admin Users</h1>

      {error && <p className="text-red-500">{error}</p>}

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
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button
          onClick={addUser}
          disabled={loading}
          className="bg-black text-white px-4 py-2 disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add User"}
        </button>
      </div>

      {/* USERS TABLE */}
      <table className="w-full border mt-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id} className="border-t">
              <td className="p-2">{u.username}</td>
              <td className="p-2">{u.email}</td>
              <td className="p-2">
                <select
                  value={u.role}
                  onChange={e => updateRole(u._id, e.target.value)}
                  className="border p-1"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
