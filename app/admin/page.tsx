"use client";

import { useEffect, useMemo, useState } from "react";
import "./admin-dashboard.css";

type Product = { _id: string; name: string; image: string; price: number; description?: string };
type User = { _id: string; username: string; email: string; role: string };

export default function AdminDashboardPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [prodRes, userRes] = await Promise.all([
          fetch("/api/admin/product", { headers: token ? { Authorization: `Bearer ${token}` } : {} }),
          fetch("/api/admin/users", { headers: token ? { Authorization: `Bearer ${token}` } : {} }),
        ]);

        if (!prodRes.ok) throw new Error("Failed to load products");
        if (!userRes.ok) throw new Error("Failed to load users");

        const [prodData, userData] = await Promise.all([prodRes.json(), userRes.json()]);
        setProducts(prodData);
        setUsers(userData);
      } catch (err: any) {
        setError(err.message || "Error loading dashboard data");
      }
    };
    fetchAll();
  }, [token]);

  const metrics = useMemo(() => {
    const totalProducts = products.length;
    const totalUsers = users.length;
    const avgPrice = products.length ? products.reduce((s, p) => s + Number(p.price || 0), 0) / products.length : 0;
    return { totalProducts, totalUsers, avgPrice };
  }, [products, users]);

  const recentProducts = useMemo(() => products.slice(0, 6), [products]);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Dashboard</h1>
        <span className="dashboard-sub">Overview</span>
      </div>

      {error && (
        <div style={{
          background: "rgba(239,68,68,0.12)",
          border: "1px solid rgba(239,68,68,0.35)",
          color: "#b91c1c",
          padding: "10px 12px",
          borderRadius: 12,
          marginBottom: 14,
        }}>{error}</div>
      )}

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label">Total Products</div>
          <div className="kpi-value">{metrics.totalProducts}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Total Users</div>
          <div className="kpi-value">{metrics.totalUsers}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Average Price</div>
          <div className="kpi-value">€ {metrics.avgPrice.toFixed(2)}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Orders</div>
          <div className="kpi-value">—</div>
        </div>
      </div>

      <div className="panel" style={{ marginBottom: 18 }}>
        <div className="panel-header">
          <h3 className="panel-title">Recent Products</h3>
        </div>
        <div className="panel-body">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {recentProducts.map((p) => (
                <tr key={p._id}>
                  <td>{p.name}</td>
                  <td>€ {Number(p.price).toFixed(2)}</td>
                  <td>{p.description || ""}</td>
                </tr>
              ))}
              {recentProducts.length === 0 && (
                <tr>
                  <td colSpan={3} style={{ color: "#6b7280", padding: "12px" }}>No products</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="panel">
        <div className="panel-header">
          <h3 className="panel-title">Users</h3>
        </div>
        <div className="panel-body">
          <table className="table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.slice(0, 6).map((u) => (
                <tr key={u._id}>
                  <td>{u.username}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={3} style={{ color: "#6b7280", padding: "12px" }}>No users</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
