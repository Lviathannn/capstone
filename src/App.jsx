import { BrowserRouter, Routes, Route } from "react-router-dom";
import DisplayAdmin from "./pages/ManageAdmin";
import { Dashboard } from "./components/layout/sidebar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DisplayAdmin />} />
        <Route path="/sidebar" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
