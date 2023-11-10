import React, { useState, useEffect } from "react";
import MarkDownForCustom from "@/components/MarkDownForCustom";
import AuthUserInfo from "@/components/AuthUserInfo";
import { testFn } from "@/apis/test";
import ButtonList from "../ButtonList";

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
      <div className=" flex w-10/12 mx-auto">
        <div className=" w-10/12">
          <MarkDownForCustom data={data} />
        </div>
        <div className=" w-2/12">
          <AuthUserInfo />
        </div>
      </div>
    </>
  );
}
