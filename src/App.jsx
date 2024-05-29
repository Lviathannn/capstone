import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "@/pages/landing";
import { LoginPage } from "@/pages/login";
import DashboardPage from "@/pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
