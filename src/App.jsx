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
import ManageUser from "@/pages/ManageUser/index";
import UserDetail from "@/pages/ManageUser/UserDetail";
import UserCreate from "@/pages/ManageUser/UserCreate";
import ManageContent from "@/pages/manageContent/index";
import DetailContent from "@/pages/manageContent/detailContent";
import EditContent from "@/pages/manageContent/editContent";
import CreateContent from "@/pages/manageContent/createContent";
import ManageRoute from "@/pages/ManageRoute/index";
import DetailRoute from "@/pages/ManageRoute/DetailRoute";

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
        <Route
          path="/manage-content"
          element={currentUser ? <ManageContent /> : <Navigate to="/login" />}
        />
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/manage-user" element={<ManageUser />} />
        <Route path="/manage-user/detail" element={<UserDetail />} />
        <Route path="/manage-user/create" element={<UserCreate />} />
        <Route path="/manage-route" element={<ManageRoute />} />
        <Route path="/manage-route/:id" element={<DetailRoute />} />
        <Route path="/manage-content" element={<ManageContent />} />
        <Route path="manage-content/create" element={<CreateContent />} />
        <Route path="manage-content/detail" element={<DetailContent />} />
        <Route path="manage-content/edit" element={<EditContent />}/>
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;