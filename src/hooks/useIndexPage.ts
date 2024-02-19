import { get } from "@/apis";
import { Page } from "@/page/UserControl/Component/UserPage";
import { useMemo } from "react";
import { useQuery } from "react-query";

export function useIndexPage() {
  const { data } = useQuery(
    ["indexmd"],
    async () => await get<{ data: Page[] }>("/page/indexmd", { platform: 1 }),
    {
      refetchOnWindowFocus: false,
    }
  );
  const indexPage = useMemo(() => {
    const home = data?.data.filter((item) => item.position === "home") || [];
    const slide = data?.data.filter((item) => item.position === "slide") || [];
    const swipe = data?.data.filter((item) => item.position === "swipe") || [];
    return {
      home,
      slide,
      swipe,
    };
  }, [data]);
  return indexPage;
}
