import { useEffect, useState } from "react";
import MarkDownForCustom from "./components/MarkDownForCustom";
import { testFn } from "./apis/test";

export default function App() {
  const [data, setData] = useState<string>("");
  useEffect(() => {
    const fetchData = async () => {
      const res = await testFn();
      setData(res.data);
    };
    fetchData();
  }, []);
  return (
    <div className="w-2/3 mx-auto">
      <MarkDownForCustom data={data} />
    </div>
  );
}
