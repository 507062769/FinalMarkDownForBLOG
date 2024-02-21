import { TabContextProvide } from "@/Context/TabContextProvide";
import Footer from "@/components/Footer";
import MHeader from "@/components/Mobile/Header";
import { Outlet } from "react-router-dom";

export default function MIndex() {
  return (
    <>
      <div className="mobile-box" id="mobile-box-id">
        <TabContextProvide>
          <MHeader />
        </TabContextProvide>
        <Outlet />
        <Footer />
      </div>
    </>
  );
}
