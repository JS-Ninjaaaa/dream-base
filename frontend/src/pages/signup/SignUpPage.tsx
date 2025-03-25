import { Link } from "react-router-dom";
import SakuraScatterEffect from "../dreams/components/SakuraScatterEffect";
import SignUpForm from "./SignUpForm";

const SignUpPage = () => {
  return (
    <>
      <SakuraScatterEffect />
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96 border border-pink-300">
          <h2 className="text-3xl font-bold text-center mb-6 text-pink-400">
            新規登録
          </h2>

          <SignUpForm />

          <div className="flex flex-col items-center mt-6">
            <h1 className="text-sm text-gray-600">
              すでにアカウントをお持ちの方
            </h1>
            <Link to="/login" className="text-pink-400 font-semibold underline">
              ログインページへ
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
