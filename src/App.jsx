import { BrowserRouter, Routes, Route } from "react-router-dom";
import DisplayAdmin from "./pages/ManageAdmin";
import { Dashboard } from "./components/layout/sidebar";
import { DetailAdmin } from "./pages/ManageAdmin/DetailAdmin";
import { AddAdmin } from "./pages/ManageAdmin/AddAdmin.jsx";
import LandingPage from "@/pages/landing";
import { LoginPage } from "@/pages/login";
import DashboardPage from "@/pages/dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sidebar" element={<Dashboard />} />
        <Route path="/detail" element={<DetailAdmin />} />
        <Route path="/add" element={<AddAdmin />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/manage-admin" element={<DisplayAdmin />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
