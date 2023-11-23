import Header from "@/components/Header";
import { Outlet } from "react-router-dom";
import "./index.less";
import Footer from "@/components/Footer";
import ButtonList from "../PageComponent/component/ButtonList";
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
  return (
    <>
      {/* <canvas id="snowCanvas" /> */}
      <div className="container-snow" id="ContainerSnow">
        <Header />
        <Outlet />
        <Footer />
      </div>
      <ButtonList />
    </>
  );
}
