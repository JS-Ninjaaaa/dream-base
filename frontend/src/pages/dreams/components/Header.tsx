const Header = () => {
  return (
    <header className="bg-[#FF99CC] from-orange-200 via-pink-200 to-red-200 text-black py-4 px-6 flex justify-between items-center shadow-md">
      {/* ロゴ */}
      <h1 className="text-[#444444] text-2xl font-bold">Dream Sink</h1>

      {/* メニュー */}
      <nav>
        <div className="flex space-x-6 text-lg">
          <a
            href="/dreams/public"
            className="text-white font-josefin font-bold text-base mt-2 transition-colors cursor-pointer"
          >
            みんなの夢
          </a>
          <a
            href="/dreams/mine"
            className="text-white font-josefin font-bold text-base mt-2 transition-colors cursor-pointer"
          >
            自分の夢
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
