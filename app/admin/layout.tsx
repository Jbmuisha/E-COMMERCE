"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import {
  faGauge,
  faBox,
  faCartShopping,
  faUsers,
  faRightFromBracket,
  faBars,
  faXmark,
  faBell,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./admin.css";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(true);
  const [lang, setLang] = useState<"EN" | "FR">("EN");
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <div className="admin">
      {/* SIDEBAR */}
      <aside className={`sidebar ${open ? "open" : "closed"}`}>
        <div className="sidebar-header">
          {open && (
            <div className="logo">
              <img src="/image/logo.png" alt="Admin Logo" />
              <span>ADMIN</span>
            </div>
          )}
          <button className="toggle" onClick={() => setOpen(!open)}>
            <FontAwesomeIcon icon={open ? faXmark : faBars} />
          </button>
        </div>

        <nav className="menu">
          <AdminLink href="/admin" icon={faGauge} label="Dashboard" open={open} />
          <AdminLink href="/admin/products" icon={faBox} label="Products" open={open} />
          <AdminLink href="/admin/orders" icon={faCartShopping} label="Orders" open={open} />
          <AdminLink href="/admin/users" icon={faUsers} label="Users" open={open} />
        </nav>

        <button className="logout">
          <FontAwesomeIcon icon={faRightFromBracket} />
          {open && <span>Logout</span>}
        </button>
      </aside>

      {/* MAIN */}
      <div className="main">
        {/* TOPBAR */}
        <header className="topbar">
          {/* LOGO */}
          <div className="topbar-logo">
            <img src="/image/logo.png" alt="Admin Logo" />
          </div>

          {/* ACTIONS */}
          <div className="topbar-actions">
            {/* NOTIFICATIONS */}
            <button className="icon-btn" title="Notifications">
              <FontAwesomeIcon icon={faBell} />
              <span className="notif-dot" />
            </button>

            {/* LANGUAGE SWITCH */}
            <div className="lang-switch">
              <button
                className={`lang-btn ${lang === "EN" ? "active" : ""}`}
                onClick={() => setLang("EN")}
              >
                EN
              </button>
              <button
                className={`lang-btn ${lang === "FR" ? "active" : ""}`}
                onClick={() => setLang("FR")}
              >
                FR
              </button>
            </div>

            {/* PROFILE DROPDOWN */}
            <div className="profile-wrapper">
  <button
    className={`profile-btn ${profileOpen ? "open" : ""}`}
    onClick={() => setProfileOpen(!profileOpen)}
  >
    <img src="/image/avatar.png" className="avatar-img" alt="Admin Avatar" />
    {profileOpen && <span className="profile-name">Admin</span>}
  </button>
</div>

          </div>
        </header>

        {/* CONTENT */}
        <main className="content">{children}</main>
      </div>
    </div>
  );
}

/* LINK COMPONENT */
function AdminLink({
  href,
  icon,
  label,
  open,
}: {
  href: string;
  icon: any;
  label: string;
  open: boolean;
}) {
  return (
    <Link href={href} className="menu-link">
      <FontAwesomeIcon icon={icon} />
      {open && <span>{label}</span>}
    </Link>
  );
}
