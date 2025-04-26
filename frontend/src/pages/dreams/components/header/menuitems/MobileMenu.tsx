import { MenuItem } from "@/types/menu";
import {  useRef } from "react";

interface MenuItemsProps {
  menuItems: MenuItem[];
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const MobileMenu = ({ menuItems, menuOpen, setMenuOpen }: MenuItemsProps) => {

  const menuRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
    <div
      ref={menuRef}
      className={`fixed top-0 right-0 h-full w-2/3 max-w-[300px] bg-white z-50 text-black shadow-lg
        transition-transform duration-800 ease-in-out
        ${menuOpen ? "translate-x-0" : "translate-x-full"}
      `}
    >
        <div className="flex justify-end p-4 mt-3 mr-3">
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
          ${menuOpen ? "opacity-40 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
        onClick={() => setMenuOpen(false)}
      />
    </>
  )
}

export default MobileMenu