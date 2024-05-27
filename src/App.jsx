import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "@/pages/landing";
import { LoginPage } from "@/pages/login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
