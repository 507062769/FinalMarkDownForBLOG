import { useLocation } from "react-router-dom";

export default function OtherPersonalCenter() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const qq = params.get("qq");
  return <div style={{ minHeight: "calc(100vh - 154px)" }}>个人主页{qq}</div>;
}
