import Header from "@/components/Header";
import { Outlet } from "react-router-dom";
import "./index.less";
import Footer from "@/components/Footer";
import store from "@/stores";
import { useQuery } from "react-query";
import { get } from "@/apis";
import { useContext } from "react";
import { UserContext } from "@/Context/UserContextProvide";
const snowsColor = [
  "#FF4500", // 橙红色
  "#FF8C00", // 暗橙色
  "#FFD700", // 金色
  "#32CD32", // 酸橙绿
  "#008000", // 纯绿色
  "#ADFF2F", // 鼠尾草绿
  "#00FFFF", // 青色
  "#1E90FF", // 道奇蓝
  "#8A2BE2", // 蓝紫色
  "#4B0082", // 靛青色
  "#FF69B4", // 热情的粉红
  "#FF1493", // 深粉红
  "#DC143C", // 猩红色
  "#FFB6C1", // 浅粉红
  "#FFC0CB", // 粉红
  "#FFA07A", // 海贝壳
];
window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    var canvas = document.getElementById("snowCanvas") as any;
    // if (!canvas) return;
    var ctx = canvas?.getContext("2d");
    canvas.width = window?.innerWidth;
    canvas.height = window?.innerHeight;

    var snowflakes = [] as any;

    function createSnowflake() {
      const colorIndex =
        Math.floor(Math.random() * 100 + 1) % snowsColor.length;

      return {
        x: Math.random() * canvas.width,
        y: 0,
        radius: Math.random() * 3 + 1,
        speedX: Math.random() * 2 - 1,
        speedY: Math.random() * 3 + 1,
        colorIndex: colorIndex,
      };
    }

    for (var i = 0; i < 100; i++) {
      snowflakes.push(createSnowflake());
    }

    function drawSnowflakes() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (var i = 0; i < snowflakes.length; i++) {
        var snowflake = snowflakes[i];
        ctx.fillStyle = snowsColor[snowflake.colorIndex];
        ctx.beginPath();
        ctx.arc(snowflake.x, snowflake.y, snowflake.radius, 0, Math.PI * 2);
        ctx.fill();
        snowflake.x += snowflake.speedX;
        snowflake.y += snowflake.speedY;
        if (snowflake.y > canvas.height) {
          snowflake.y = 0;
        }
        if (snowflake.x > canvas.width) {
          snowflake.x = 0;
        } else if (snowflake.x < 0) {
          snowflake.x = canvas.width;
        }
      }
    }
    function update() {
      drawSnowflakes();
      setTimeout(update, 10); // 每秒钟更新 30 次，模拟 requestAnimationFrame
    }
    update();
  }, 500);
});

export default function Index() {
  const { message } = store;
  const { userInfo, isLogin } = useContext(UserContext);

  const { data: ___ } = useQuery(
    ["SYS-messageList", isLogin],
    async () => {
      if (!isLogin) return;
      const res = await Promise.all([
        get("/messages/systemNotification", { qq: userInfo?.qq || "" }),
        get("/messages/list", {
          fromQQ: userInfo?.qq || "",
        }),
      ]);
      return {
        systemNotification: res?.[0].systemNotification || [],
        chatMessageList: res?.[1].data,
      };
    },
    {
      onSuccess: (data) => {
        // 先将当前的通知清空，避免重复
        message.systemMessageList = [];
        data?.systemNotification.forEach((item: any) => {
          const from = item.fromQQ === "unlogin" ? "未登录用户" : item.userName;
          const notification =
            item.notificationType === "top"
              ? "点赞"
              : item.notificationType === "bottom"
              ? "点踩"
              : ("评论" as any);
          message.systemMessageList.push({
            notification,
            from,
            pageId: item.pageId,
            fromQQ: item.fromQQ,
            lastDate: item.operatorDate,
          });
        });
        let maxLastDate = Number(data?.systemNotification[0].operatorDate);
        data?.systemNotification?.forEach((item: any) => {
          if (Number(item?.operatorDate) > maxLastDate) {
            maxLastDate = Number(item?.operatorDate);
          }
        });
        const system = message.contactPerson.find(
          (item) => item.qq === "admin"
        )!;
        system.lastDate = maxLastDate;
        message.messageList = data?.chatMessageList;
      },
      refetchOnWindowFocus: false,
    }
  );

  const { data: __ } = useQuery(
    ["contactPerson", isLogin],
    async () => {
      if (!isLogin) return;
      return await get("/messages/contactPerson", { qq: userInfo?.qq || "" });
    },
    {
      onSuccess: (data: any) => {
        // 由于每次进入message请求都会重新发送，但
        message.contactPerson = message.contactPerson.filter(
          (item) =>
            item.qq === "admin" ||
            (item?.isTemporarily &&
              data?.result.findIndex((items: any) => item.qq === items.qq) < 0)
        ) as any;
        data?.result.forEach(
          ({ qq, lastDate, unreadCount, targetName, targetImg }) => {
            message.contactPerson.push({
              qq,
              lastDate,
              unreadCount: message.currentChatUser.qq === qq ? 0 : unreadCount,
              userName: targetName,
              userImg: targetImg,
            });
          }
        );
        message.updateUnreadAllCount();
        message.updateContactPersonListSort();
      },
      refetchOnWindowFocus: false,
    }
  );
  return (
    <>
      <canvas id="snowCanvas" />
      <div className="container-snow" id="ContainerSnow">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </>
  );
}
