import { Dispatch, SetStateAction, createContext, useState } from "react";

export const TabContext = createContext<{
  tabKey: string;
  setTabKey: Dispatch<SetStateAction<string>>;
}>({} as any);

export function TabContextProvide(props: any) {
  const [tabKey, setTabKey] = useState("login");

  return (
    <TabContext.Provider
      value={{
        tabKey,
        setTabKey,
      }}
    >
      {props.children}
    </TabContext.Provider>
  );
}
