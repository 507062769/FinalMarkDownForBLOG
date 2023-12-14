import { useLocation } from "react-router-dom";

export default function Search() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const key = params.get("key") || "";
  return (
    <div className="w-11/12 mx-auto" style={{ height: "calc(100vh - 154px)" }}>
      {key}
    </div>
  );
}
