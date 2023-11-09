import userImg from "@/assets/imgUser.jpg";
import "./index.less";

export default function AuthUserInfo() {
  return (
    <>
      <div className="w-full box-border ml-5 p-6" id="AuthInfo">
        <img src={userImg} alt="头像" id="AuthImg" />
        <p>用户名：xxxxxxxx</p>
        <p>注册时间：2023 - 12 - 01</p>
        <p>粉丝数量：9999</p>
        <p>文章数量：9999</p>
      </div>
    </>
  );
}
