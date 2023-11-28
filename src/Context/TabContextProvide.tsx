import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";

export const TabContext = createContext<{
  tabKey: string;
  setTabKey: Dispatch<SetStateAction<string>>;
}>({} as any);

export function TabContextProvide(props: any) {
  const [tabKey, setTabKey] = useState("login");
  console.log(props.children);

  useEffect(() => {
    console.log(tabKey);
  }, [tabKey]);
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
