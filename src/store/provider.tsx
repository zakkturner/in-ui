"use client";

import { Provider } from "react-redux";
import { store } from "./store";
import { CookiesProvider } from "react-cookie";
import { UrlContext } from "@/context/UrlContext";

export function Providers({ children }) {
  return (
    <Provider store={store}>
      <CookiesProvider>
        <UrlContext.Provider value={process.env.NEXT_PUBLIC_API_URL}>
          {children}
        </UrlContext.Provider>
      </CookiesProvider>
    </Provider>
  );
}
