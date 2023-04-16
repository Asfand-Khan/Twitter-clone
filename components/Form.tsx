import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import usePosts from "@/hooks/usePosts";
import useRegisterModal from "@/hooks/useRegisterModal";
import axios from "axios";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import Button from "./layouts/Button";
import Avatar from "./Avatar";

interface FormProps {
  placeholder: string;
  isComment?: boolean;
  isPost?: string;
}
const Form: React.FC<FormProps> = ({ placeholder, isComment, isPost }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const { data: currentUser } = useCurrentUser();
  const { mutate: mutatePosts } = usePosts();

  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await axios.post("/api/posts", { body });

      toast.success("Tweet created successfully!");

      setBody("");
      mutatePosts();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [mutatePosts, body]);
  return (
    <div className="border-b-[1px] border-neutral-800 px-5 py-2">
      {currentUser ? (
        <div className="flex flex-row gap-4">
          <div>
            <Avatar userId={currentUser?.id} />
          </div>
          <div className="w-full">
            <textarea
              disabled={isLoading}
              onChange={(e) => setBody(e.target.value)}
              value={body}
              className="
              disabled:opacity-80
              peer
              resize-none
              mt-3
              w-full
              ring-0
              outline-none
              text-[20px]
              placeholder-neutral-500
              text-white
              bg-black
              "
              placeholder={placeholder}
            ></textarea>
            <hr className="opacity-0 peer-focus:opacity-100 w-full h-[1px] border-sky-500 border-[1px]" />
            <div className="flex flex-row justify-end mt-4">
              <Button
                label="Tweet"
                onClick={onSubmit}
                disabled={isLoading || !body}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="py-8">
          <h1 className="text-white text-2xl font-bold text-center mb-4">
            Welcome To Twitter
          </h1>
          <div className="flex flex-row items-center justify-center gap-4">
            <Button label="Login" onClick={loginModal.onOpen} />
            <Button label="Register" secondary onClick={registerModal.onOpen} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;