import { Dispatch, SetStateAction, createContext, useState } from "react";

export const TabContext = createContext<{
  tabKey: string;
  setTabKey: Dispatch<SetStateAction<string>>;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}>({} as any);

export function TabContextProvide(props: any) {
  const [tabKey, setTabKey] = useState("login");
  const [open, setOpen] = useState(false);
  return (
    <TabContext.Provider
      value={{
        tabKey,
        setTabKey,
        open,
        setOpen,
      }}
    >
      {props.children}
    </TabContext.Provider>
  );
}
