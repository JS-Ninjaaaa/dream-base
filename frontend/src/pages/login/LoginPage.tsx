import { Link } from "react-router-dom";
import SakuraScatterEffect from "../dreams/components/SakuraScatterEffect";
import LoginForm from "./LoginForm";

const LoginPage = () => {
  return (
    <>
      <SakuraScatterEffect />
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96 border border-pink-300">
          <h2 className="text-3xl font-bold text-center mb-6 text-pink-600">
            🌸ログイン
          </h2>

          <LoginForm />

          <div className="flex flex-col items-center mt-6">
            <h1 className="text-sm text-gray-600">
              アカウントをお持ちでない方
            </h1>
            <Link
              to="/signup"
              className="text-pink-600 font-semibold underline"
            >
              アカウントの作成
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
