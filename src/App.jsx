import { BrowserRouter, Routes, Route } from "react-router-dom";
import DisplayAdmin from "./pages/ManageAdmin";
import { DetailAdmin } from "./pages/ManageAdmin/DetailAdmin";
import { AddAdmin } from "./pages/ManageAdmin/AddAdmin.jsx";
import LandingPage from "@/pages/landing";
import { LoginPage } from "@/pages/login";
import DashboardPage from "@/pages/dashboard";
import ManageUser from "@/pages/ManageUser";
import UserDetail from "@/pages/ManageUser/UserDetail";
import UserCreate from "./pages/ManageUser/UserCreate";
import { Toaster } from "@/components/ui/sonner";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import ManageRoute from "@/pages/ManageRoute";

function App() {
  const currentUser = useSelector((state) => state.auth.user);

  return (
    <BrowserRouter>
      <Routes>
        {/* Protected Routes */}
        <Route
          path="/detail"
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
        <Route path="/manage-route" element={<ManageRoute />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;