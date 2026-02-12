"use client";

import { useEffect, useState } from "react";

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
    image: "",
    price: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  /* ================= FETCH PRODUCTS ================= */
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

  /* ================= ADD PRODUCT ================= */
  const addProduct = async () => {
    if (!token) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...newProduct, price: Number(newProduct.price) }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to add product");

      setProducts([data, ...products]);
      setNewProduct({ name: "", image: "", price: "", description: "" });
    } catch (err: any) {
      setError(err.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UPDATE PRODUCT ================= */
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

  /* ================= DELETE PRODUCT ================= */
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
    <div className="relative min-h-screen p-10 max-w-[1200px] mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-white">Admin Products Management</h1>

      {/* ERROR */}
      {error && (
        <div className="bg-red-500/20 text-red-200 p-4 rounded">{error}</div>
      )}

      {/* ADD PRODUCT FORM */}
      <div className="bg-white/10 p-6 rounded-lg space-y-4 border border-white/30">
        <h2 className="text-xl font-semibold text-white">Add New Product</h2>
        <div className="grid grid-cols-2 gap-4">
          {["name", "image", "price", "description"].map((field) => (
            <input
              key={field}
              type={field === "price" ? "number" : "text"}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={(newProduct as any)[field]}
              onChange={(e) =>
                setNewProduct({ ...newProduct, [field]: e.target.value })
              }
              className="bg-transparent border border-white text-white px-4 py-2 rounded focus:outline-none"
            />
          ))}
        </div>
        <button
          onClick={addProduct}
          disabled={loading}
          className="bg-white text-black px-6 py-2 rounded font-semibold hover:scale-105 transition disabled:opacity-40"
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </div>

      {/* PRODUCTS TABLE */}
      <div className="bg-white/10 rounded-lg border border-white/30 overflow-hidden">
        <table className="w-full text-left text-white">
          <thead className="bg-white/10">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Image</th>
              <th className="p-4">Price</th>
              <th className="p-4">Description</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="border-t border-white/20 hover:bg-white/10 transition-all">
                <td className="p-4">
                  <input
                    type="text"
                    value={p.name}
                    onChange={(e) => updateProduct(p._id, { name: e.target.value })}
                    className="bg-transparent border border-white text-white px-2 py-1 rounded w-full"
                  />
                </td>
                <td className="p-4">
                  <input
                    type="text"
                    value={p.image}
                    onChange={(e) => updateProduct(p._id, { image: e.target.value })}
                    className="bg-transparent border border-white text-white px-2 py-1 rounded w-full"
                  />
                </td>
                <td className="p-4">
                  <input
                    type="number"
                    value={p.price}
                    onChange={(e) => updateProduct(p._id, { price: Number(e.target.value) })}
                    className="bg-transparent border border-white text-white px-2 py-1 rounded w-full"
                  />
                </td>
                <td className="p-4">
                  <input
                    type="text"
                    value={p.description || ""}
                    onChange={(e) => updateProduct(p._id, { description: e.target.value })}
                    className="bg-transparent border border-white text-white px-2 py-1 rounded w-full"
                  />
                </td>
                <td className="p-4 space-x-2">
                  <button
                    onClick={() => deleteProduct(p._id)}
                    className="bg-red-500 px-3 py-1 rounded hover:scale-105 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {products.length === 0 && (
          <div className="p-6 text-center text-white/70">No products found</div>
        )}
      </div>
    </div>
  );
}
