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

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  /* ================= FETCH USERS ================= */
  useEffect(() => {
    if (!token) return;

    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/admin/users", {
          headers: { Authorization: `Bearer ${token}` },
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

  /* ================= ADD USER ================= */
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
        body: JSON.stringify(newUser),
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

  /* ================= UPDATE ROLE ================= */
  const updateRole = async (id: string, role: string) => {
    if (!token) return;

    try {
      const res = await fetch("/api/admin/users", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id, role }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to update role");
      }

      const updated = await res.json();
      setUsers(users.map((u) => (u._id === id ? updated : u)));
    } catch (err: any) {
      setError(err.message || "Server error");
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="relative z-[10] p-[40px] max-w-[1100px] mx-auto space-y-[40px]">
        <h1 className="text-[32px] font-bold text-white drop-shadow-lg">
          Admin Users Management
        </h1>

        {/* ERROR */}
        {error && (
          <div className="bg-red-500/20 backdrop-blur-md text-red-200 p-[14px] rounded-[14px] border border-red-400/30">
            {error}
          </div>
        )}

        {/* CREATE USER CARD */}
        <div className="bg-white/10 backdrop-blur-xl p-[30px] rounded-[24px] space-y-[20px] border border-white/30">
          <h2 className="text-[22px] font-semibold text-white drop-shadow-md">
            Create New User
          </h2>

          <div className="grid grid-cols-2 gap-[20px]">
            {["username", "email", "password"].map((field) => (
              <input
                key={field}
                type={field === "password" ? "password" : "text"}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={(newUser as any)[field]}
                onChange={(e) =>
                  setNewUser({ ...newUser, [field]: e.target.value })
                }
                className="bg-transparent border border-white text-white placeholder-white/70 px-[16px] py-[14px] rounded-[14px] focus:outline-none focus:ring-2 focus:ring-white/60 transition-all"
              />
            ))}

            <select
              value={newUser.role}
              onChange={(e) =>
                setNewUser({ ...newUser, role: e.target.value as any })
              }
              className="bg-transparent border border-white text-white px-[16px] py-[14px] rounded-[14px] focus:outline-none focus:ring-2 focus:ring-white/60"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            onClick={addUser}
            disabled={loading}
            className="bg-white text-black px-[26px] py-[14px] rounded-[14px] font-semibold hover:scale-[1.02] transition-all disabled:opacity-40"
          >
            {loading ? "Adding..." : "Add User"}
          </button>
        </div>

        {/* USERS TABLE */}
        <div className="bg-white/10 backdrop-blur-xl rounded-[24px] border border-white/30 shadow-[0_20px_80px_rgba(0,0,0,0.3)] overflow-hidden">
          <table className="w-full text-left text-white">
            <thead className="bg-white/10">
              <tr>
                <th className="p-[18px]">Username</th>
                <th className="p-[18px]">Email</th>
                <th className="p-[18px]">Role</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u) => (
                <tr
                  key={u._id}
                  className="border-t border-white/20 hover:bg-white/10 transition-all"
                >
                  <td className="p-[18px]">{u.username}</td>
                  <td className="p-[18px]">{u.email}</td>
                  <td className="p-[18px]">
                    <select
                      value={u.role}
                      onChange={(e) => updateRole(u._id, e.target.value)}
                      className="bg-transparent border border-white text-white px-[12px] py-[8px] rounded-[10px]"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {users.length === 0 && (
            <div className="p-[30px] text-center text-white/70">
              No users found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
