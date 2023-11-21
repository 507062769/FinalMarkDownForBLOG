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
        <div className="w-10/12 box-border" id="FatherContainer">
          {/* 轮播图 */}
          <div
            className="w-full flex SwiperContainer"
            style={{ boxShadow: "0px 0px 20px 4px rgba(0,0,0,.8)" }}
          >
            <div
              className="swiper w-8/12  relative overflow-hidden"
              id="SwiperContainer"
            >
              <Swiper list={list} />
            </div>
            <div className="box-border p-5  w-4/12 flex flex-col justify-between">
              <article className="flex flex-col small-page">
                <img src={th} className="h-5/6"></img>
                <div
                  className="h-1/6"
                  style={{
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    borderBottom: "4px solid white",
                  }}
                >
                  这是一篇文章啊撒大声地撒大声地阿打算撒打啊d
                </div>
              </article>
              <article className=" flex flex-col small-page">
                <img src={th} className="h-5/6"></img>
                <div
                  className="h-1/6"
                  style={{
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    borderBottom: "4px solid white",
                  }}
                >
                  这是一篇文章
                </div>
              </article>
            </div>
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
