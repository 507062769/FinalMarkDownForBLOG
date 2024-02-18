import Footer from "@/components/Footer";
import MHeader from "@/components/Mobile/Header";
import { Button } from "antd";
import { Outlet, useNavigate } from "react-router-dom";

export default function MIndex() {
  const navigate = useNavigate();
  return (
    <>
      <MHeader />
      <Button onClick={() => navigate("other")}>测试</Button>
      <Button onClick={() => navigate("/mobile")}>测试</Button>
      <Outlet />
      <Footer />
    </>
  );
}
