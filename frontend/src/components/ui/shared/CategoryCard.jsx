export default function CategoryCard({ icons, text }) {
    return (
        <div className="w-full bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:cursor-pointer transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg">
            <div className="p-4 sm:p-5 flex flex-col items-center justify-center gap-3 sm:gap-4">
                <div className="bg-surface-dim rounded-full p-3 sm:p-4 size-16 sm:size-20 flex items-center justify-center shrink-0">
                    {icons}
                </div>
                <h3 className="mt-1 text-lg sm:text-xl font-medium text-gray-600 text-center truncate w-full px-1">
                    {text}
                </h3>
            </div>
        </div>
    )
}