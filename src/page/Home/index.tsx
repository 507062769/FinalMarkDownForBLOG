import th from "@/assets/th.jpg";
import th1 from "@/assets/th1.jpg";
import th2 from "@/assets/th2.jpg";
import th3 from "@/assets/th3.jpg";
import AuthUserInfo from "@/components/AuthUserInfo";
import PageList from "@/components/PageList";
import Swiper from "./Component/Swiper";

export default function Home() {
  const list = [
    { title: "Umi3", url: th, pageId: "1111" },
    { title: "React", url: th1, pageId: "2222" },
    { title: "Vue", url: th2, pageId: "3333" },
    { title: "Js", url: th3, pageId: "4444" },
  ];
  return (
    <>
      <div className=" flex w-11/12 mx-auto">
        <div className="w-10/12 box-border">
          {/* 轮播图 */}
          <div className="w-full flex">
            <div
              className="swiper w-8/12 bg-slate-50 h-96 relative overflow-hidden"
              id="SwiperContainer"
            >
              <Swiper list={list} />
            </div>
            <div className="box-border pl-5 bg-slate-700 w-4/12"></div>
          </div>
          {/* 轮播图end */}
          <PageList />
        </div>
        <div className="w-2/12">
          <AuthUserInfo />
        </div>
      </div>
    </>
  );
}
