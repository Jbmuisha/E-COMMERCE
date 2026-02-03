"use client";

import { useState } from "react";

export default function UsersPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F6F1EB] px-[16px]">
      <div className="w-full max-w-[420px] bg-white rounded-[16px] p-[32px] shadow-[0_20px_40px_rgba(0,0,0,0.12)]">
        {/* TITLE */}
        <h1 className="text-[24px] font-bold text-center mb-[8px]">
          {mode === "login" ? "Welcome back" : "Create an account"}
        </h1>

        <p className="text-center text-[#6B7280] text-[14px] mb-[24px]">
          {mode === "login"
            ? "Sign in to your account"
            : "Sign up to get started"}
        </p>

        {/* FORM */}
        <form className="flex flex-col gap-[16px]">
          {mode === "signup" && (
            <input
              type="text"
              placeholder="Full name"
              className="w-full border border-[#E5E7EB] rounded-[10px] px-[14px] py-[12px] text-[14px] outline-none focus:border-black"
            />
          )}

          <input
            type="email"
            placeholder="Email"
            className="w-full border border-[#E5E7EB] rounded-[10px] px-[14px] py-[12px] text-[14px] outline-none focus:border-black"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border border-[#E5E7EB] rounded-[10px] px-[14px] py-[12px] text-[14px] outline-none focus:border-black"
          />

          <button
            type="submit"
            className="w-full bg-black text-white rounded-[10px] py-[12px] text-[14px] font-semibold hover:opacity-[0.9] transition"
          >
            {mode === "login" ? "Login" : "Sign up"}
          </button>
        </form>

        {/* SWITCH */}
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
