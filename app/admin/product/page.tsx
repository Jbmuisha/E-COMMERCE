"use client";

import { useEffect, useState } from "react";
import "../admin-products.css";

type Product = {
  _id: string;
  name: string;
  image: string;
  price: number;
  description?: string;
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/admin/product", {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (!res.ok) throw new Error("Failed to fetch products");
        const data: Product[] = await res.json();
        setProducts(data);
      } catch (err: any) {
        setError(err.message || "Error loading products");
      }
    };
    fetchProducts();
  }, [token]);

  // Add product (multipart/form-data)
  const addProduct = async () => {
    if (!token) return;
    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("name", newProduct.name);
      formData.append("price", newProduct.price);
      formData.append("description", newProduct.description);
      if (imageFile) formData.append("image", imageFile);

      const res = await fetch("/api/admin/product", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to add product");

      setProducts([data, ...products]);
      setNewProduct({ name: "", price: "", description: "" });
      setImageFile(null);
    } catch (err: any) {
      setError(err.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  // Update product (JSON)
  const updateProduct = async (id: string, updated: Partial<Product>) => {
    if (!token) return;
    try {
      const res = await fetch("/api/admin/product", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id, ...updated }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update product");
      setProducts(products.map((p) => (p._id === id ? data : p)));
    } catch (err: any) {
      setError(err.message || "Server error");
    }
  };

  // Delete product
  const deleteProduct = async (id: string) => {
    if (!token) return;
    try {
      const res = await fetch(`/api/admin/product?id=${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to delete product");
      setProducts(products.filter((p) => p._id !== id));
    } catch (err: any) {
      setError(err.message || "Server error");
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1 className="admin-title">Admin Products</h1>
        <span className="admin-count">{products.length} items</span>
      </div>

      {error && <div className="admin-alert">{error}</div>}

      <div className="admin-card">
        <h2 className="card-title">Add New Product</h2>
        <div className="form-grid">
          <div className="form-group">
            <label className="label">Name</label>
            <input
              type="text"
              placeholder="e.g. Dior Sauvage"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              className="input"
            />
          </div>
          <div className="form-group">
            <label className="label">Price</label>
            <input
              type="number"
              placeholder="e.g. 49.99"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              className="input"
            />
          </div>
          <div className="form-group" style={{ gridColumn: "1 / -1" }}>
            <label className="label">Description</label>
            <input
              type="text"
              placeholder="Short description"
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              className="input"
            />
          </div>
          <div className="form-group" style={{ gridColumn: "1 / -1" }}>
            <label className="label">Product Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              className="file-input"
            />
          </div>
        </div>
        <div className="actions">
          <button onClick={addProduct} disabled={loading} className="btn btn-primary">
            {loading ? "Adding..." : "Add Product"}
          </button>
          {imageFile && <span className="admin-count">Selected: {imageFile.name}</span>}
        </div>
      </div>

      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th className="th" style={{ width: "26%" }}>Name</th>
              <th className="th" style={{ width: "14%" }}>Image</th>
              <th className="th" style={{ width: "14%" }}>Price</th>
              <th className="th" style={{ width: "32%" }}>Description</th>
              <th className="th actions" style={{ width: "14%" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="tr">
                <td className="td">
                  <input
                    type="text"
                    value={p.name}
                    onChange={(e) => updateProduct(p._id, { name: e.target.value })}
                    className="input"
                  />
                </td>
                <td className="td">
                  <div className="thumb">
                    <img src={p.image} alt={p.name} className="thumb-img" />
                  </div>
                </td>
                <td className="td">
                  <input
                    type="number"
                    value={p.price}
                    onChange={(e) => updateProduct(p._id, { price: Number(e.target.value) })}
                    className="input"
                  />
                </td>
                <td className="td">
                  <input
                    type="text"
                    value={p.description || ""}
                    onChange={(e) => updateProduct(p._id, { description: e.target.value })}
                    className="input"
                  />
                </td>
                <td className="td actions">
                  <div className="actions" style={{ justifyContent: "flex-end" }}>
                    <button
                      onClick={() => updateProduct(p._id, { name: p.name, price: p.price, description: p.description })}
                      className="btn btn-blue"
                    >
                      Edit
                    </button>
                    <button onClick={() => deleteProduct(p._id)} className="btn btn-danger">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {products.length === 0 && <div className="empty">No products found</div>}
      </div>
    </div>
  );
}
