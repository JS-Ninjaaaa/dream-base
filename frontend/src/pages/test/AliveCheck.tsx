import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase"; // Supabaseクライアント

const ENDPOINT = import.meta.env.VITE_API_ENDPOINT as string;

const AuthCallback = () => {
  const [message, setMessage] = useState("認証中...");

  useEffect(() => {
    const checkAuth = async () => {
      // セッション情報を取得
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("認証エラー", error);
        setMessage("❌ ログインに失敗しました");
        return;
      }

      if (!data.session) {
        setMessage("❌ 認証情報が見つかりません");
        return;
      }

      const token = data.session.access_token; // JWT トークン
      console.log("JWT トークン:", token);

      // Flask に JWT を送信
      try {
        const response = await fetch(ENDPOINT +  "/jwtest", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const result = await response.json();
        if (response.ok) {
          console.log("Flask レスポンス:", result);
          setMessage(`✅ 認証成功！UUID: ${result.uuid}`);
        } else {
          setMessage(`❌ 認証エラー: ${result.error}`);
        }
      } catch (err) {
        console.error("サーバーエラー", err);
        setMessage("❌ サーバー通信に失敗しました");
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
