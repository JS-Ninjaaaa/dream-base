import { useState, useEffect, useRef } from "react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  // メニューのアイテムをまとめた
  const menuItems = [
    { name: 'みんなの夢', link: '/dreams/public' },
    { name: '自分の夢', link: '/dreams/mine' },
  ];

  // 画面幅が640px以上になったらハンバーガーメニューを閉じる
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 外側クリックでハンバーガーメニューを閉じる
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        menuRef.current && !menuRef.current.contains(target) &&
        buttonRef.current && !buttonRef.current.contains(target)
      ) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <>
    <nav className="bg-[#FF99CC] from-orange-200 via-pink-200 to-red-200 text-black py-4 px-6 flex justify-between items-center shadow-md">
      {/* ロゴ */}
      <h1 className="text-[#444444] text-2xl font-bold">Dream Sink</h1>

      {/* メニュー */}
      <div className="hidden sm:flex space-x-6 text-white font-josefin font-bold text-base mt-2 space-x-6">
        {menuItems.map((item) => (
          <a
            href={item.link}
            className="text-white font-josefin font-bold text-base mt-2 transition-colors cursor-pointer"
          >
            {item.name}
          </a>
        ))}
      </div>

      {/* ハンバーガー */}
      <div className="sm:hidden">
        <button
          ref={buttonRef}
          onClick={() => setMenuOpen(!menuOpen)}
          className="focus:outline-none mt-2"
        >
          <img
          src="/assets/header/bars_24.png"
          alt="menu toggle"
          width={30}
          height={30}
        />          
        </button>
      </div>
    </nav>

    <div
      ref={menuRef}
      className={`fixed top-0 right-0 h-full w-2/3 max-w-[300px] bg-white z-50 text-black shadow-lg
        transition-transform duration-800 ease-in-out
        ${menuOpen ? "translate-x-0" : "translate-x-full"}
      `}
    >
        <div className="flex justify-end p-4">
          <button onClick={() => setMenuOpen(false)}>
            <img src="/assets/header/delete.png" alt="close" width={30} height={30} />
          </button>
        </div>

        <nav className="flex flex-col items-start space-y-6 p-6 text-pink-400 font-josefin font-bold text-base">
          {menuItems.map((item) => (
            <a
              key={item.link}
              href={item.link}
              className="w-full py-3 px-2 hover:bg-gray-100  border-b border-pink-400"
              onClick={() => setMenuOpen(false)}
            >
              {item.name}
            </a>
          ))}
        </nav>
      </div>

      <div
        className={`
          fixed inset-0 bg-black z-40
          transition-opacity duration-800 ease-in-out
          ${menuOpen ? "opacity-30 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
        onClick={() => setMenuOpen(false)}
      />

    </>
  );
};

export default Header;
