import React, { useEffect } from "react";
import Header from "@/components/Header";
import ButtonList from "./component/ButtonList";
import PageComponent from "./component/PageComponent";
import "./index.less";

// 页面加载完成后开始动画

export default function AuthPage() {
  useEffect(() => {
    setTimeout(() => {
      var canvas = document.getElementById("snowCanvas");
      var ctx = canvas.getContext("2d");
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      var snowflakes = [];

      function createSnowflake() {
        return {
          x: Math.random() * canvas.width,
          y: 0,
          radius: Math.random() * 3 + 1,
          speedX: Math.random() * 2 - 1,
          speedY: Math.random() * 3 + 1,
        };
      }

      for (var i = 0; i < 100; i++) {
        snowflakes.push(createSnowflake());
      }

      function drawSnowflakes() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "white";
        for (var i = 0; i < snowflakes.length; i++) {
          var snowflake = snowflakes[i];
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

      // console.log(document.querySelector(".container-snow"));
      // document.querySelector(".container-snow")?.addEventListener("scroll", (e) => {
      //   console.log(e);
      update();
      // });
    }, 10);
  }, []);
  return (
    <>
      <canvas id="snowCanvas" />
      <div className="container-snow" id="ContainerSnow">
        <div id="PageComponent">
          <Header />
          <PageComponent />
          <ButtonList />
        </div>
      </div>
    </>
  );
}
