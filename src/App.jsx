import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DetailAdmin } from "@/pages/ManageAdmin/DetailAdmin/index";
import { AddAdmin } from "@/pages/ManageAdmin/AddAdmin/index";
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
import UserEdit from "@/pages/ManageUser/UserEdit";
import ManageContent from "@/pages/manageContent/index";
import DetailContent from "@/pages/manageContent/detailContent";
import EditContent from "@/pages/manageContent/editContent";
import CreateContent from "@/pages/manageContent/createContent";
import ManageRoute from "@/pages/ManageRoute/index";
import DetailRoute from "@/pages/ManageRoute/DetailRoute";
<<<<<<< HEAD
import ProtectedRoute from "@/hooks/protectedRoute";
import { privateRoutes } from "@/constant/routes";
import DestinationPage from "@/pages/destination";
import CreateDestination from "@/pages/destination/create";
import DetailDestination from "@/pages/destination/detail";
import Spinner from "@/components/ui/Spinner";
import NotFound from "@/components/features/error/NotFound";
=======
import ProtectedRoute from "./hooks/protectedRoute";
import { privateRoutes } from "./constant/routes";
import DestinationPage from "./pages/destination";
import CreateDestination from "./pages/destination/create";
import DetailDestination from "./pages/destination/detail";
>>>>>>> e4c74baaea5ee6d5277a862088c7da7c485c926f

function App() {
  const currentUser = useSelector((state) => state.auth.user);

  return (
    <BrowserRouter>
      <Routes>
        {/* Private Routes */}
        {/* Admin */}
        <Route element={<ProtectedRoute requiredRole="super admin" />}>
          <Route
            path={`${privateRoutes.ADMIN}/detail/:id`}
            element={<DetailAdmin />}
          />
          <Route
            path={`${privateRoutes.ADMIN}/edit/:id`}
            element={<EditAdmin />}
          />
          <Route
            path={`${privateRoutes.ADMIN}/create`}
            element={<AddAdmin />}
          />
          <Route path={privateRoutes.ADMIN} element={<DisplayAdmin />} />
        </Route>
        {/* Dashboard */}

        <Route path={privateRoutes.DASHBOARD} element={<DashboardPage />} />

        {/* Content */}

        <Route path={privateRoutes.CONTENT} element={<ManageContent />} />

        <Route
          path={`${privateRoutes.CONTENT}/create`}
          element={<CreateContent />}
        />
        <Route
<<<<<<< HEAD
<<<<<<< HEAD
          path={`${privateRoutes.CONTENT}/detail`}
          element={<DetailContent />}
        />
        <Route
          path={`${privateRoutes.CONTENT}/edit`}
          element={<EditContent />}
=======
          path={`${privateRoutes.CONTENT}/detail/:id`}
          element={currentUser ? <DetailContent /> : <Navigate to="/login" />}
        />
        <Route
=======
          path={`${privateRoutes.CONTENT}/detail/:id`}
          element={currentUser ? <DetailContent /> : <Navigate to="/login" />}
        />
        <Route
>>>>>>> e4c74baaea5ee6d5277a862088c7da7c485c926f
          path={`${privateRoutes.CONTENT}/edit/:id`}
          element={currentUser ? <EditContent /> : <Navigate to="/login" />}
>>>>>>> 582f697 (fix: Fix Bug Conflict)
        />

        {/* User */}

        <Route path={privateRoutes.USER} element={<ManageUser />} />
        <Route
          path={`${privateRoutes.USER}/detail/:id`}
          element={<UserDetail />}
        />
        <Route path={`${privateRoutes.USER}/create`} element={<UserCreate />} />
        <Route path={`${privateRoutes.USER}/edit/:id`} element={<UserEdit />} />

        {/* Route */}

        <Route path={privateRoutes.ROUTE} element={<ManageRoute />} />
        <Route path={`${privateRoutes.ROUTE}/:id`} element={<DetailRoute />} />

        {/* User */}

        <Route path={privateRoutes.USER} element={<ManageUser />} />

        {/* Destination */}
<<<<<<< HEAD
        <Route element={<ProtectedRoute requiredRole="super admin" />}>
          <Route
            path={privateRoutes.DESTINATION}
            element={<DestinationPage />}
          />
          <Route
            path={privateRoutes.DESTINATION + "/create"}
            element={<CreateDestination />}
          />
          <Route
            path={privateRoutes.DESTINATION + "/detail/:id"}
            element={<DetailDestination />}
          />
        </Route>

        {/* Public Routes */}
   
        <Route path="/login" element={<LoginPage />} />
<<<<<<< HEAD
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/login" element={<LoginPage />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
=======
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/manage-user" element={<ManageUser />} />
        <Route path="/manage-user/detail" element={<UserDetail />} />
        <Route path="/manage-user/create" element={<UserCreate />} />
        <Route path="/manage-route" element={<ManageRoute />} />
        <Route path="/manage-route/:id" element={<DetailRoute />} />
        <Route path="/manage-content" element={<ManageContent />} />
        <Route path="manage-content/create" element={<CreateContent />} />
        <Route path="manage-content/detail/:id" element={<DetailContent />} />
        <Route path="manage-content/edit" element={<EditContent />}/>
>>>>>>> af21de2 (feat: Implement GET API, Read, and Delete)
=======

        <Route
          path={privateRoutes.DESTINATION}
          element={currentUser ? <DestinationPage /> : <Navigate to="/login" />}
        />
        <Route
          path={privateRoutes.DESTINATION + "/create"}
          element={
            currentUser ? <CreateDestination /> : <Navigate to="/login" />
          }
        />
        <Route
          path={privateRoutes.DESTINATION + "/detail/:id"}
          element={
            currentUser ? <DetailDestination /> : <Navigate to="/login" />
          }
        />

        {/* Public Routes */}

        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/login" element={<LoginPage />} />
>>>>>>> e4c74baaea5ee6d5277a862088c7da7c485c926f
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
