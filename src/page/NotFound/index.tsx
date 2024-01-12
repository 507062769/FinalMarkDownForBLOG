import { Button, Result } from "antd";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div style={{ minHeight: "calc(100vh - 154px)" }}>
      <Helmet>
        <title>页面飞走了</title>
      </Helmet>
      <Result
        status="500"
        title="500"
        subTitle="你来晚了，页面飞走了"
        extra={
          <Link to={"/"}>
            <Button type="primary">回主页</Button>
          </Link>
        }
      />
    </div>
  );
}
