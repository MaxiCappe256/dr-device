export default function CategoryCard({icons, text}) {
    return (
        <div className="max-w-sm bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:cursor-pointer">
            <div className="p-5 flex flex-col items-center justify-center gap-4">
                {icons}
                <h3 className="mt-1 text-xl font-extralight text-primary leading-tight">{text}</h3>
            </div>
        </div>
    )
}
