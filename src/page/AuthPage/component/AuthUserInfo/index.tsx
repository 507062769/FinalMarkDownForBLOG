import userImg from "@/assets/imgUser.jpg";
import "./index.less";

export default function AuthUserInfo({ userId = 999 }: { userId?: number }) {
  return (
    <>
      <div className="box-border ml-5 p-6" id="AuthInfo">
        <img src={userImg} alt="头像" id="AuthImg" />
        {userId === 999 ? (
          <>
            <p>介绍</p>
          </>
        ) : (
          <>
            <p>用户名：xxxxxxxx</p>
            <p>注册时间：2023 - 12 - 01</p>
            <p>粉丝数量：9999</p>
            <p>文章数量：9999</p>
          </>
        )}
      </div>
    </>
  );
}
