import { BsHouseFill, BsBellFill } from "react-icons/bs";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import SideBarLogo from "./SideBarLogo";
import SideBarItem from "./SideBarItem";
import SideBarTweetButton from "./SideBarTweetButton";
import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import { signOut } from "next-auth/react";

const SideBar = () => {
  const loginModal = useLoginModal();
  const { data } = useCurrentUser();
  const items = [
    {
      label: "Home",
      href: "/",
      icon: BsHouseFill,
    },
    {
      label: "Notifications",
      href: "/notifications",
      icon: BsBellFill,
    },
    {
      label: "Profile",
      href: "/user/123",
      icon: FaUser,
    },
  ];
  return (
    <div className="col-span-1 h-full pr-4 md:pr-6">
      <div className="flex flex-col items-end">
        <div className="space-y-2 lg:w-[230px]">
          <SideBarLogo />
          {items.map((item) => (
            <SideBarItem
              label={item.label}
              href={item.href}
              icon={item.icon}
              key={item.label}
            />
          ))}
          {data ? (
            <SideBarItem
              onClick={() => signOut()}
              label="Logout"
              icon={BiLogOut}
            />
          ) : (
            <SideBarItem
              onClick={() => loginModal.onOpen()}
              label="Login"
              icon={BiLogIn}
            />
          )}
          <SideBarTweetButton />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
