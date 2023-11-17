import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./page/AuthPage";
import Home from "./page/Home";
import Index from "@/page/Index";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />}>
          <Route index element={<Home />} />
          <Route path="page" element={<AuthPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
