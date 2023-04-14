import useUser from "@/hooks/useUser";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback } from "react";

interface AvatarProps {
  userId: string;
  isLarge?: boolean;
  hasBorders?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ userId, isLarge, hasBorders }) => {
  const { data: fetchedUser } = useUser(userId);
  const router = useRouter();

  const onClick = useCallback(
    (event: any) => {
      event.stopPropagation();

      const url = `/users/${userId}`;

      router.push(url);
    },
    [router, userId]
  );
  return (
    <div
      className={`rounded-full cursor-pointer relative hover:opacity-90 transition ${
        isLarge ? "h-32" : "h-12"
      } ${isLarge ? "w-32" : "w-12"} ${
        hasBorders ? "border-4 border-black" : " "
      }`}
    >
      <Image
        fill
        alt="Avatar"
        style={{
          objectFit: "cover",
          borderRadius: "100%",
        }}
        src={fetchedUser?.profileImage || "/images/placeholder.png"}
        onClick={onClick}
      />
    </div>
  );
};

export default Avatar;
