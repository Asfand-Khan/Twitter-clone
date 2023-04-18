import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { IconType } from "react-icons";
import { BsDot } from "react-icons/bs";

interface SideBarItemProps {
  label: string;
  href?: string;
  icon: IconType;
  onClick?: () => void;
  auth?: boolean;
  alert?: boolean;
}
const SideBarItem: React.FC<SideBarItemProps> = ({
  label,
  href,
  icon: Icon,
  onClick,
  auth,
  alert,
}) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const { data: currentUser } = useCurrentUser();

  const handleClick = useCallback(() => {
    if (onClick) {
      return onClick();
    }

    if (auth && !currentUser) {
      loginModal.onOpen();
    } else if (href) {
      router.push(href);
    }
  }, [router, href, auth, loginModal, onClick, currentUser]);

  return (
    <div onClick={handleClick} className="flex flex-row items-center">
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
        {alert ? (
          <BsDot className="text-sky-500 absolute -top-4 left-0" size={80} />
        ) : null}
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
        {alert ? (
          <BsDot className="text-sky-500 absolute -top-4 left-0" size={70} />
        ) : null}
      </div>
    </div>
  );
};

export default SideBarItem;
