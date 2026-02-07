"use client";

import { useState } from "react";

export default function UsersPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    Username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        mode === "login" ? "/api/auth/login" : "/api/auth/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong");
        return;
      }

      if (mode === "login") {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

       
        window.location.href = "/dashboard";
      } else {
        
        setMode("login");
      }
    } catch (err) {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F6F1EB] px-[16px]">
      <div className="w-full max-w-[420px] bg-white rounded-[16px] p-[32px] shadow-[0_20px_40px_rgba(0,0,0,0.12)]">
        <h1 className="text-[24px] font-bold text-center mb-[8px]">
          {mode === "login" ? "Welcome back" : "Create an account"}
        </h1>

        <p className="text-center text-[#6B7280] text-[14px] mb-[24px]">
          {mode === "login"
            ? "Sign in to your account"
            : "Sign up to get started"}
        </p>

        {error && (
          <p className="text-red-500 text-sm text-center mb-3">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-[16px]">
          {mode === "signup" && (
            <input
              type="text"
              name="Username"
              placeholder="Full name"
              value={form.Username}
              onChange={handleChange}
              required
              className="w-full border rounded-[10px] px-[14px] py-[12px]"
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border rounded-[10px] px-[14px] py-[12px]"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full border rounded-[10px] px-[14px] py-[12px]"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white rounded-[10px] py-[12px] font-semibold"
          >
            {loading ? "Please wait..." : mode === "login" ? "Login" : "Sign up"}
          </button>
        </form>

        <div className="text-center text-[13px] mt-[20px] text-[#6B7280]">
          {mode === "login" ? (
            <>
              Don’t have an account?{" "}
              <button
                onClick={() => setMode("signup")}
                className="text-black font-semibold hover:underline"
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={() => setMode("login")}
                className="text-black font-semibold hover:underline"
              >
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
