import { CloseIcon } from "../../../utils/icons";
export default function Modal({ children, className, title, onClose, ...props }) {
  return (
    <div
      className={`z-50 fixed overflow-y-hidden top-0 left-0 right-0 bottom-0 bg-black/20 flex items-center justify-center ${className}`}
      {...props}>
      <div className="p-8 bg-white h-fit w-[50vw] rounded-2xl shadow-lg">
        <div className="flex items-center justify-between mb-4 border-b border-tertiary/30 pb-3">
          <h2 className="text-4xl font-bold">
            {title}
          </h2>
          <CloseIcon height="40" className="cursor-pointer" onClick={onClose} />
        </div>
        {children}
      </div>
    </div>
  );
}
