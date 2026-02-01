import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import MainLayout from "./components/layout/MainLayout";
import MenuManagement from "./pages/MenuManagement";
import OrdersDashboard from "./pages/OrdersDashboard";

const App = () => {
  return (
    <BrowserRouter>
      <MainLayout>
        <Toaster position="top-right" />

        <Routes>
          <Route path="/" element={<MenuManagement />} />
          <Route path="/orders" element={<OrdersDashboard />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
};

export default App;
