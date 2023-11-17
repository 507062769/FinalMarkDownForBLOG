// import th from "@/assets/th.jpg";
// import th1 from "@/assets/th1.jpg";
// import th2 from "@/assets/th2.jpg";
// import th3 from "@/assets/th3.jpg";
import AuthUserInfo from "@/components/AuthUserInfo";
import PageList from "@/components/PageList";

export default function Home() {
  return (
    <>
      <div className=" flex w-11/12 mx-auto h-96">
        <div className="w-10/12 box-border">
          {/* 轮播图 */}
          <div className="w-full flex">
            <div className="swiper w-8/12 bg-slate-50 h-96"></div>
            <div className="box-border pl-5 bg-slate-700 w-4/12"></div>
          </div>
          {/* 轮播图end */}
          <PageList />
        </div>
        <div className="w-2/12 -z-40">
          <AuthUserInfo />
        </div>
      </div>
    </>
  );
}
