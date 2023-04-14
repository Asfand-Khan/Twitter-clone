import { useCallback } from "react";
import { FaFeather } from "react-icons/fa";
import { useRouter } from "next/router";

const SideBarTweetButton = () => {
  const router = useRouter();
  const onClick = useCallback(() => {
    router.push("/");
  }, [router]);

  return (
    <div onClick={onClick}>
      <div
        className="
      mt-6
      lg:hidden
      w-14
      h-14
      p-4
      flex
      items-center
      justify-center
      bg-sky-500
      rounded-full
      hover:opacity-80
      transition
      cursor-pointer
      "
      >
        <FaFeather size={24} color="white" />
      </div>
      <div
        className="
      hidden
      mt-6
      lg:block
      rounded-full
      px-4
      py-2
      cursor-pointer
      bg-sky-500
      transition
      hover:opacity-80
      "
      >
        <p className="text-white text-center font-semibold text-[20px]">
          Tweet
        </p>
      </div>
    </div>
  );
};

export default SideBarTweetButton;
