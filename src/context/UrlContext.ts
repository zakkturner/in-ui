import { createContext } from "react";

export const UrlContext = createContext(process.env.NEXT_PUBLIC_API_URL);
