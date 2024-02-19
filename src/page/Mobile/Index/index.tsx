import Footer from "@/components/Footer";
import MHeader from "@/components/Mobile/Header";
import { Outlet } from "react-router-dom";

export default function MIndex() {
  return (
    <>
      <MHeader />
      <Outlet />
      <Footer />
    </>
  );
}
