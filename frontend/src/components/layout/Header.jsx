import React from "react";

const Header = ({ onMenuClick }) => {
  return (
    <header
      style={{
        height: "60px",
        background: "#1e293b",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 16px",
        position: "sticky",
        top: 0,
        zIndex: 1300
      }}
    >
      {/* TITLE (ALWAYS VISIBLE) */}
      <div style={{ fontWeight: "bold", fontSize: "16px" }}>
        🍽️ Restaurant Admin
      </div>

      {/* HAMBURGER (MOBILE ONLY via CSS) */}
      <button className="hamburger-btn" onClick={onMenuClick}>
        ☰
      </button>
    </header>
  );
};

export default Header;
