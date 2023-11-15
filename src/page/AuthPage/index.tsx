import PageComponent from "./component/PageComponent";
import "./index.less";

// 页面加载完成后开始动画
setTimeout(() => {
  window.addEventListener("load", () => {
    // 创建一个雪花元素
    function createSnowflakes() {
      const snowflake = document.createElement("span");
      snowflake.className = "snowflake";
      snowflake.innerHTML = "&#10052;"; // 雪花的字符或图标
      snowflake.style.left = Math.random() * 90 + "vw";
      snowflake.style.top = Math.random() * 1000 + "vh";
      snowflake.style.animationDuration = Math.random() * 10 + 5 + "s";
      snowflake.style.opacity = Math.random() + "";
      snowflake.style.fontSize = Math.random() * 50 + "px";
      return snowflake;
    }

    // 添加雪花到页面
    function addSnowflake() {
      const snowflakeContainer = document.getElementById("snowflakeContainer")!;
      snowflakeContainer.style.height = window.getComputedStyle(
        document.querySelector("#PageComponent")!
      ).height;
      const snowflake = createSnowflakes();
      snowflakeContainer.appendChild(snowflake);

      // 雪花动画结束后移除元素
      snowflake.addEventListener("animationend", () => {
        snowflakeContainer.removeChild(snowflake);
      });
    }

    // 初始化
    function init() {
      const numSnowflakes = 1000; // 雪花数量

      // 创建多个雪花
      for (let i = 0; i < numSnowflakes; i++) {
        addSnowflake();
      }
    }
    init();
    console.log(
      window.getComputedStyle(document.querySelector("#PageComponent")!).height
    );
    const snows = document.querySelectorAll(".snowflake");
    setInterval(() => {
      console.log(snows[0].style);
    }, 1000);
  });
}, 100);

export default function AuthPage() {
  return (
    <>
      <div
        style={{
          overflow: "hidden",
          backgroundColor: "#000",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          // height: "100%",
          zIndex: "-1",
        }}
        id="snowflakeContainer"
      ></div>
      <div id="PageComponent">
        <PageComponent />
      </div>
    </>
  );
}
