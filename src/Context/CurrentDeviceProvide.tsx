// @ts-nocheck
import { createContext, useEffect, useState } from "react";

export const CurrentDeviceContext = createContext<{
  isPc: boolean;
  setIsPc: React.Dispatch<React.SetStateAction<boolean>>;
}>({} as any);

export default function CurrentDeviceProvide({ children }: any) {
  const [isPc, setIsPc] = useState<boolean>(true);
  return (
    <CurrentDeviceContext.Provider value={{ isPc, setIsPc }}>
      {children}
    </CurrentDeviceContext.Provider>
  );
}
