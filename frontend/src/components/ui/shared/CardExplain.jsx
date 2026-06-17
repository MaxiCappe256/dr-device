export default function CardExplain({ icon, title, description, color, className }) {
  return (
    <div className={`w-full flex gap-4 p-4 bg-white rounded-xl border-2 border-gray-100 ${className}`}>
      <div className={`${color} rounded-lg p-2 size-12 flex items-center justify-center shrink-0`}>
        {icon}
      </div>
      <div className="flex flex-col">
        <h3 className="font-semibold text-gray-800 text-xl">{title}</h3>
        <p className="text-sm text-tertiary mt-1">{description}</p>
      </div>
    </div>

  )
}
