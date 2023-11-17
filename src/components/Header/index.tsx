import Search from "./component/Search";
import UserInfo from "./component/UserInfo";
import "./index.less";

export default function Header() {
  return (
    <header
      className=" h-16 flex box-border px-10 justify-between mb-7 z-50"
      style={{
        border: "1px solid white",
        boxShadow: "0 0 20px 4px rgba(0, 0, 0, 0.3)",
      }}
    >
      <h1 className="w-1/5 m-0 ">
        {/* <a href="http://127.0.0.1:5173" id="Logo">
          首页
        </a> */}
      </h1>
      <div className="w-2/5 pt-3">
        <Search />
      </div>
      <div className="w-1/5">
        <UserInfo />
      </div>
    </header>
  );
}
