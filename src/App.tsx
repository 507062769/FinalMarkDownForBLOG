import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./page/AuthPage";
import Home from "./page/Home";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/page" element={<AuthPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
