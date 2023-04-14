import useLoginModal from "@/hooks/useLoginModal";
import { toast } from "react-hot-toast";
import { useCallback, useState } from "react";
import axios from "axios";
import Input from "../layouts/Input";
import Modal from "../Modal";
import useRegisterModal from "@/hooks/useRegisterModal";
import { signIn } from "next-auth/react";

const RegisterModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onToggle = useCallback(() => {
    if (isLoading) return;

    registerModal.onClose();
    loginModal.onOpen();
  }, [isLoading, registerModal, loginModal]);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await axios.post("/api/register", {
        name,
        username,
        email,
        password,
      });

      // Notify the user by toaster
      toast.success("Account successfully created...");

      // logging in
      signIn("credentials", {
        email,
        password,
      });

      // After successful registration
      registerModal.onClose();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong...");
    } finally {
      setIsLoading(false);
    }
  }, [registerModal, name, email, username, password, signIn]);

  // Body for the modal
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        disabled={isLoading}
      />
      <Input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        disabled={isLoading}
      />
      <Input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        disabled={isLoading}
      />
      <Input
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        disabled={isLoading}
      />
    </div>
  );

  const footerContent = (
    <div className="text-center text-neutral-400 mt-4">
      <p>
        Already have an account?
        <span
          onClick={onToggle}
          className="text-white hover:underline cursor-pointer"
        >
          &nbsp;Sign In
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Create An Account"
      actionLabel="Sign Up"
      onClose={registerModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
