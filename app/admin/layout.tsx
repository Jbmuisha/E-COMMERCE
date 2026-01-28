"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGauge,
  faBox,
  faCartShopping,
  faUsers,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* SIDEBAR */}
      <aside className="w-[260px] bg-black text-white flex flex-col">
        {/* LOGO */}
        <div className="h-[72px] flex items-center justify-center border-b border-white/10">
          <span className="text-xl font-bold tracking-widest">JBOY ADMIN</span>
        </div>

        {/* MENU */}
        <nav className="flex-1 px-4 py-6 space-y-2 text-sm">
          <AdminLink href="/admin" icon={faGauge} label="Dashboard" />
          <AdminLink href="/admin/products" icon={faBox} label="Products" />
          <AdminLink href="/admin/orders" icon={faCartShopping} label="Orders" />
          <AdminLink href="/admin/users" icon={faUsers} label="Users" />
        </nav>

        {/* LOGOUT */}
        <div className="p-4 border-t border-white/10">
          <button className="w-full flex items-center gap-3 text-sm text-red-400 hover:text-red-300 transition">
            <FontAwesomeIcon icon={faRightFromBracket} />
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col">
        {/* TOPBAR */}
        <header className="h-[72px] bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <h1 className="text-lg font-semibold">Admin Dashboard</h1>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium">Admin</p>
              <p className="text-xs text-gray-400">admin@jboy.com</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold">
              A
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}

/* ===== LINK COMPONENT ===== */
function AdminLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: any;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition"
    >
      <FontAwesomeIcon icon={icon} />
      {label}
    </Link>
  );
}
