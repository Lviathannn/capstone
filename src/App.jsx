import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DetailAdmin } from "@/pages/ManageAdmin/DetailAdmin/index";
import { AddAdmin } from "@/pages/ManageAdmin/AddAdmin/index";
import LandingPage from "@/pages/landing";
import { LoginPage } from "@/pages/login";
import { DisplayAdmin } from "@/pages/ManageAdmin/DisplayAdmin/index";
import { EditAdmin } from "@/pages/ManageAdmin/EditAdmin/index";

import { Toaster } from "@/components/ui/sonner";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import DashboardPage from "@/pages/Dashboard";
import { FormAddAdmin } from "./pages/ManageAdmin/AddAdmin/formAdd";
import { FormEdit } from "./pages/ManageAdmin/EditAdmin/form";

function App() {
  const currentUser = useSelector((state) => state.auth.user);

  return (
    <BrowserRouter>
      <Routes>
        {/* Protected Routes */}
        <Route
          path="/detail/:id"
          element={currentUser ? <DetailAdmin /> : <Navigate to="/login" />}
        />
        <Route
          path="/edit/:id"
          element={currentUser ? <EditAdmin /> : <Navigate to="/login" />}
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
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
