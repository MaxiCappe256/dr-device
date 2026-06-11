export default function Input({ icon, ...props }) {
  return (
    <div className="relative">
      <div className="absolute top-3.5 left-3.5 text-tertiary">{icon}</div>
      <input
        className="w-full p-3 pl-10 border rounded-lg outline-none border-tertiary-container"
        {...props}
      />
    </div>
  );
}
