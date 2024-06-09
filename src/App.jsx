import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DetailAdmin } from "@/pages/ManageAdmin/DetailAdmin/index";
import { AddAdmin } from "@/pages/ManageAdmin/AddAdmin/index";
import LandingPage from "@/pages/landing";
import { LoginPage } from "@/pages/login";

import { DisplayAdmin } from "@/pages/ManageAdmin/DisplayAdmin/index";
import { EditAdmin } from "@/pages/ManageAdmin/EditAdmin/index";


import DashboardPage from "@/pages/dashboard";
import ManageUser from "@/pages/ManageUser";
import UserDetail from "@/pages/ManageUser/UserDetail";
import UserCreate from "./pages/ManageUser/UserCreate";

import { Toaster } from "@/components/ui/sonner";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function App() {
  const currentUser = useSelector((state) => state.auth.user);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/edit" element={<EditAdmin />} />
        {/* Protected Routes */}
        <Route
          path="/detail/:id"
          element={currentUser ? <DetailAdmin /> : <Navigate to="/login" />}
        />
        <Route
          path="/add"
          element={currentUser ? <AddAdmin /> : <Navigate to="/login" />}
        />
        <Route
          path="/manage-admin"
          element={currentUser ? <DisplayAdmin /> : <Navigate to="/login" />}
        />
        <Route
          path="/dashboard"
          element={currentUser ? <DashboardPage /> : <Navigate to="/login" />}
        />
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/manage-user" element={<ManageUser />} />
        <Route path="/manage-user/detail" element={<UserDetail />} />
        <Route path="/manage-user/create" element={<UserCreate />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;