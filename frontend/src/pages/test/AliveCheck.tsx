import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase"; // Supabaseクライアント

const AuthCallback = () => {
  const [message, setMessage] = useState("認証中...");

  useEffect(() => {
    const checkAuth = async () => {
      // セッション情報を取得
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("認証エラー", error);
        setMessage("❌ ログインに失敗しました");
      } else if (data.session) {
        console.log("ログイン成功", data);
        setMessage("✅ Twitterログイン成功！");
      } else {
        setMessage("❌ 認証情報が見つかりません");
      }
    };

    checkAuth();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md text-center">
        <h2 className="text-2xl font-bold text-green-500">{message}</h2>
        <p className="text-gray-700 mt-2">コールバック処理が完了しました。</p>
      </div>
    </div>
  );
};

export default AuthCallback;
