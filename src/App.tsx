import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import Index from "@/page/Index";
import PageComponent from "./page/PageComponent";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />}>
          <Route index element={<Home />} />
          <Route path="page" element={<PageComponent />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
