import { LoadingContext } from "@/contexts/LoadingContext";
import { supabase } from "@/lib/supabase";
import { useContext } from "react";
import { FaXTwitter } from "react-icons/fa6";

const XLoginButton = () => {
  const APP_URL = import.meta.env.VITE_APP_URL;
  const { setIsLoading } = useContext(LoadingContext);

  const handleXLoginButtonClick = async () => {
    setIsLoading(true);

    try {
      await supabase.auth.signInWithOAuth({
        provider: "twitter",
        options: {
          redirectTo: `${APP_URL}/login/oauth`,
        },
      });
    } catch (error) {
      alert("X ログインに失敗しました");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleXLoginButtonClick}
      className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <FaXTwitter className="inline-block mb-1" />
      でログイン
    </button>
  );
};

export default XLoginButton;
