import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const MainLayout = ({ children }) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div>
      <Header onMenuClick={() => setMobileSidebarOpen(true)} />

      <div style={{ display: "flex" }}>
        <Sidebar
          mobileOpen={mobileSidebarOpen}
          onClose={() => setMobileSidebarOpen(false)}
        />

        <main
          style={{
            flex: 1,
            padding: "24px",
            background: "#f1f5f9",
            minHeight: "calc(100vh - 60px)"
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
