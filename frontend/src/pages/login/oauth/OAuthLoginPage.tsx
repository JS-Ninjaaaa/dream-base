import { loginWithOAuth } from "@/api/auth/auth";
import { userAtom } from "@/atoms/userAtom";
import { supabase } from "@/lib/supabase";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const OAuthLoginPage = () => {
  const [, setUser] = useAtom(userAtom);

  const navigate = useNavigate();

  useEffect(() => {
    const login = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error(error);
        navigate("/login");
      }
      if (data.session === null) {
        console.error("セッション情報を取得できませんでした");
        navigate("/login");
      } else {
        const user = data.session.user;
        await loginWithOAuth(user.id);
        setUser({
          id: user.id,
          email: user.email ?? "",
          created_at: user.created_at,
          updated_at: user.updated_at ?? "",
        });
        navigate("/");
      }
    };

    login();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <p className="text-lg font-semibold">
          ログインが完了するまでお待ちください...
        </p>
      </div>
    </div>
  );
};

export default OAuthLoginPage;
