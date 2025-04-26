import { MenuItem } from "@/types/menu";
import { useRef } from "react";

interface MenuItemsProps {
  menuItems: MenuItem[];
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const DesctopMenu = ({ menuItems, menuOpen, setMenuOpen }: MenuItemsProps) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  return (
    <>
    {/* メニュー */}
      <div className="hidden sm:flex space-x-6 text-white font-josefin font-bold text-base space-x-6">
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
    </>
  )
}

export default DesctopMenu