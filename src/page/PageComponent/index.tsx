import React, { useState, useEffect } from "react";
import { testFn } from "@/apis/test";
import MarkDownForCustom from "@/page/PageComponent/component/MarkDownForCustom";
import AuthUserInfo from "@/components/AuthUserInfo";

export default function PageComponent() {
  const [data, setData] = useState<string>("");
  useEffect(() => {
    const fetchData = async () => {
      const res = await testFn();
      setData(res.data);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className=" flex w-11/12 mx-auto">
        <div className=" w-10/12">
          <MarkDownForCustom data={data} />
        </div>
        <div className=" w-2/12">
          <AuthUserInfo userId={1} />
        </div>
      </div>
    </>
  );
}
