import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const SidebarContent = ({ navigate, location, onItemClick }) => {
  const itemStyle = (path) => ({
    padding: "12px",
    borderRadius: "6px",
    cursor: "pointer",
    marginBottom: "8px",
    background: location.pathname === path ? "#1e293b" : "transparent"
  });

  return (
    <>

      <div style={itemStyle("/")} onClick={() => onItemClick("/")}>
        📋 Menu Management
      </div>

      <div style={itemStyle("/orders")} onClick={() => onItemClick("/orders")}>
        🧾 Orders
      </div>
    </>
  );
};

const Sidebar = ({ mobileOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNav = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <>
      {/* DESKTOP */}
      <aside className="sidebar-desktop">
        <SidebarContent
          navigate={navigate}
          location={location}
          onItemClick={navigate}
        />
      </aside>

      {/* MOBILE */}
      <aside className={`sidebar-mobile ${mobileOpen ? "open" : ""}`}>
        <SidebarContent
          navigate={navigate}
          location={location}
          onItemClick={handleNav}
        />
      </aside>

      {/* OVERLAY */}
      {mobileOpen && (
        <div className="sidebar-overlay" onClick={onClose} />
      )}
    </>
  );
};

export default Sidebar;
