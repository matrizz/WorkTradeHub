interface FilterProps {
    text: string
    onClick: () => void
}

export default function Filter({ text, onClick }: FilterProps) {
    return (
        <div className="h-10 py-2 px-4 rounded-md shadow-md shadow-gray-300 flex justify-center items-center hover:cursor-pointer hover:scale-105 transition-all duration-300" onClick={onClick}>
            <p className="text-xl">{text}</p>
        </div>
    )
}