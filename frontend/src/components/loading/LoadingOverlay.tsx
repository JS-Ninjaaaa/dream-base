import { LoadingContext } from "@/contexts/LoadingContext";
import { useContext } from "react";

const LoadingOverlay = () => {
  const { isLoading } = useContext(LoadingContext);

  if (!isLoading) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-gray-200 opacity-50"></div>
      <div className="fixed inset-0 flex justify-center items-center">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
