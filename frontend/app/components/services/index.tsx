interface ServiceItemProps {
    title: string,
    description: string,
    price: number | string,
    images: string,
    location: string,
    onClick: () => void
}


export default function Services({ title, description, price, images, location, onClick }: ServiceItemProps) {
    return (
        <div className="w-96 text-black flex flex-col gap-2">
            <div className="w-full max-h-36 border-2 flex">
                <img src={images} className="w-min object-cover" alt="service image" />
            </div>
            <div className="w-full flex flex-col text-start px-2 gap-3">
                <p className="font-bold text-lg">{title}</p>
                <div className="w-full flex justify-between items-end">
                    <div className="text-sm text-gray-400">
                        <p>{description}</p>
                        <p className="text-gray-400 font-bold">{location}</p>
                    </div>
                    <p>{price}</p>
                </div>
                <div className="w-full flex justify-between gap-4">
                    <button className="w-full h-10 bg-slate-800 text-white px-2" onClick={onClick}>Candidatar-se</button>
                    <button className="w-full h-10 bg-slate-800 text-white px-2" onClick={onClick}>Conversar</button>
                </div>
            </div>
        </div>
    )
}