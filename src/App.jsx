import { BrowserRouter, Routes, Route } from "react-router-dom";
import DisplayAdmin from "./pages/ManageAdmin";
import { DetailAdmin } from "./pages/ManageAdmin/DetailAdmin";
import { AddAdmin } from "./pages/ManageAdmin/AddAdmin.jsx";
import LandingPage from "@/pages/landing";
import { LoginPage } from "@/pages/login";
import DashboardPage from "@/pages/Dashboard";
import ManageUser from "@/pages/ManageUser";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/detail" element={<DetailAdmin />} />
        <Route path="/add" element={<AddAdmin />} />
        <Route path="/manage-admin" element={<DisplayAdmin />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/manage-user" element={<ManageUser />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
