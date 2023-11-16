import Header from "@/components/Header";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <Header />
      <div>首页</div>
      <Link to="/page">文章</Link>
    </>
  );
}
