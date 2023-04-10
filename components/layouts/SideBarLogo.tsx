import { useRouter } from "next/router";
import { BsTwitter } from "react-icons/bs";

const SideBarLogo = () => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push("/")}
      className="h-14 w-14 rounded-full p-4 flex items-center justify-center hover:bg-sky-500 cursor-pointer transition"
    >
      <BsTwitter size={28} color="white" />
    </div>
  );
};

export default SideBarLogo;
