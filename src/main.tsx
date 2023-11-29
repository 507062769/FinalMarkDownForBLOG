import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.less";
import { QueryClient, QueryClientProvider } from "react-query";
import UserContextProvide from "./Context/UserContextProvide.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserContextProvide>
        <App />
      </UserContextProvide>
    </QueryClientProvider>
  </React.StrictMode>
);
