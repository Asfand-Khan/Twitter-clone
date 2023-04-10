import { AiOutlineClose } from "react-icons/ai";
import { useCallback } from "react";
import Button from "./layouts/Button";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
}) => {
  const handleClose = useCallback(() => {
    if (disabled) return;

    onClose();
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) return;

    onSubmit();
  }, [disabled, onSubmit]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="
        flex 
        items-center
        justify-center
        fixed
        overflow-x-hidden
        overflow-y-autos
        inset-0
        z-50
        outline-none
        bg-neutral-500/70
        focus:outline-none
        "
      >
        <div
          className="
            relative
            w-full
            lg:w-3/6
            my-6
            mx-auto
            lg:max-w-3xl
            h-full
            lg:h-auto
        "
        >
          {/* Content */}
          <div
            className="
            h-full
            lg:h-auto
            rounded-lg
            shadow-lg
            border-0
            relative
            flex
            flex-col
            w-full
            bg-black
            outline-none
            focus:outline-none
          "
          >
            {/* Header */}
            <div
              className="
                p-10
                rounded-t
                flex
                justify-between
                items-center
            "
            >
              <p className="text-3xl font-semibold text-white capitalize">
                {title}
              </p>
              <button
                onClick={handleClose}
                className="
                text-white
                hover:opacity-70
                p-1
                ml-auto
                border-0
                transition
              "
              >
                <AiOutlineClose size={20} />
              </button>
            </div>
            {/* Body */}
            <div className="p-10 flex-auto relative">{body}</div>
            {/* Footer */}
            <div className="flex flex-col gap-2 p-10">
              <Button
                disabled={disabled}
                label={actionLabel}
                onClick={handleSubmit}
                secondary
                large
                fullWidth
              />
              {footer}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
