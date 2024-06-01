import { BrowserRouter, Routes, Route } from "react-router-dom";
import DisplayAdmin from "./pages/ManageAdmin";
import { Dashboard } from "./components/layout/sidebar";
import { DetailAdmin } from "./pages/ManageAdmin/DetailAdmin";
import { AddAdmin } from "./pages/ManageAdmin/AddAdmin.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DisplayAdmin />} />
        <Route path="/sidebar" element={<Dashboard />} />
        <Route path="/detail" element={<DetailAdmin />} />
        <Route path="/add" element={<AddAdmin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
