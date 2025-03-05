import { createContext } from "react";

interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

// prettier-ignore
export const LoadingContext = createContext<LoadingContextType>({} as LoadingContextType);
