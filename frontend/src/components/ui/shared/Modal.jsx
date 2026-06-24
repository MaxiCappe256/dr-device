import { useEffect } from "react";
import { CloseIcon } from "../../../utils/icons";
export default function Modal({ children, className, title, onClose, ...props }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleOnClose = (event) => {
      if(event.key === "Escape") {
        onClose()
      }     
    };

    window.addEventListener('keydown', handleOnClose);

    return () => {
      window.removeEventListener('keydown', handleOnClose);
      document.body.style.overflow = "";
    };
  }, []);


  return (
    <div
      className={`z-50 fixed top-0 left-0 right-0 bottom-0 bg-black/20 flex items-center justify-center ${className}`}
      {...props}>
      <div className="p-8 bg-white h-fit w-[50vw] max-lg:w-[90vw] rounded-xl shadow-lg">
        <div className="flex items-center justify-between mb-4 border-b border-tertiary/30 pb-3">
          <h2 className="text-4xl font-semibold">
            {title}
          </h2>
          <CloseIcon height="40" className="cursor-pointer" onClick={onClose} />
        </div>
        {children}
      </div>
    </div>
  );
}
