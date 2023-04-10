import React from "react";
import { IconType } from "react-icons";

interface SideBarItemProps {
  label: string;
  href?: string;
  icon: IconType;
  onClick?: () => void;
}
const SideBarItem: React.FC<SideBarItemProps> = ({
  label,
  href,
  icon: Icon,
  onClick,
}) => {
  return (
    <div onClick={onClick} className="flex flex-row items-center">
      <div
        className="
      rounded-full
      h-14
      w-14
      relative
      flex
      items-center
      justify-center
      hover:bg-slate-300
      cursor-pointer
      lg:hidden
      transition
      "
      >
        <Icon size={28} color="white" />
      </div>
      <div
        className="
        relative
        rounded-full
        p-4
        hidden
        lg:flex
        items-center
        gap-4
        cursor-pointer
        hover:bg-slate-300
        transition
      "
      >
        <Icon size={24} color="white" />
        <p
          className="
          hidden
          lg:block
        text-white
        text-xl
        "
        >
          {label}
        </p>
      </div>
    </div>
  );
};

export default SideBarItem;
