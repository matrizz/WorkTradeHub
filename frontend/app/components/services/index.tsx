import Modal from "../modal/modalInformation"

interface ServiceItemProps {
    title: string,
    description: string,
    price: number | string,
    images: string,
    location: {
        cep: string
        city: string
        uf: string
    }
    primaryText: string,
    secondaryText: string,
    isModalOpen: boolean,
    onOpen: () => void
    onClose: () => void
    onClick: () => void
}


export default function Services({ title, description, price, images, location, primaryText, secondaryText, isModalOpen, onOpen, onClose, onClick }: ServiceItemProps) {



    return (
        <>
            <div className="w-96 text-black flex flex-col shadow-gray-300 shadow-lg gap-2 p-2 hover:scale-[1.02] transition-all duration-300">
                <div className="w-full flex flex-col gap-2" >
                    <div className="w-full h-42 max-h-42 items-center justify-center border-2 flex shadow-md">
                        <img onClick={onClick} src={images} className="hover:cursor-pointer w-min h-40 object-cover" alt="service image" />
                    </div>
                    <div className="w-full flex flex-col text-start px-2 gap-3" >
                        <p className="font-bold text-lg">{title}</p>
                        <div className="w-full flex justify-between items-end">
                            <div className="text-sm text-gray-400">
                                <p>{description}</p>
                                <i className="fas fas-icon-location"></i>
                                <p className="text-gray-400 font-bold">{location.city} - {location.uf}</p>
                            </div>
                            <p>{price}</p>
                        </div>
                    </div>
                </div>
                <div className="w-full flex justify-between gap-4">
                    <button className="w-full h-10 bg-slate-800 text-white px-2 hover:scale-[1.02] rounded-sm transition-all duration-300">{primaryText}</button>
                    <button className="w-full h-10 bg-slate-800 text-white px-2 hover:scale-[1.02] rounded-sm transition-all duration-300">{secondaryText}</button>
                </div>
            </div>
            <Modal title={title} isOpen={isModalOpen} generalTitle={primaryText} description={description} location={location} price={price} images={images} onClose={onClose} />
        </>
    )
}