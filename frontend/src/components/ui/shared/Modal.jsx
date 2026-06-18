export default function Modal({ children, className, ...props }) {
  return (
    <div
      className={`z-50 fixed overflow-y-hidden top-0 left-0 right-0 bottom-0 p-4 bg-black/20 flex items-center justify-center ${className}`}
      {...props}
    >
      <div className="relative bg-white h-[50vh] w-[50vw] p-20 rounded-2xl shadow-lg">
        {children}
      </div>
    </div>
  );
}
