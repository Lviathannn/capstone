import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DetailAdmin } from "@/pages/ManageAdmin/DetailAdmin/index";
import { AddAdmin } from "@/pages/ManageAdmin/AddAdmin/index";
import LandingPage from "@/pages/landing";
import { LoginPage } from "@/pages/login";
import DashboardPage from "@/pages/Dashboard";
import SideBar from "./components/layout/sidebar";
import { DisplayAdmin } from "@/pages/ManageAdmin/DisplayAdmin/index";
import { EditAdmin } from "@/pages/ManageAdmin/EditAdmin/index";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sidebar" element={<SideBar />} />
        <Route path="/detail" element={<DetailAdmin />} />
        <Route path="/add" element={<AddAdmin />} />
        <Route path="/edit" element={<EditAdmin />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/manage-admin" element={<DisplayAdmin />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
