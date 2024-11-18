interface createItemProps {
    title: string
    generalTitle?: string
    children?: React.ReactNode[]
    description?: string
    location?: {
        cep: string
        city: string
        uf: string
    }
    price?: number | string
    images?: string
    isOpen: boolean
    onClose: () => void
    setModalOpen: () => void
}

export default function ModalCreate({
    title,
    generalTitle,
    children,
    isOpen,
    description,
    location,
    price,
    images,
    onClose,
    setModalOpen
}: createItemProps) {
    if (isOpen) {
        return (
            <div className="fixed transition-all ease-in-out w-full h-full bg-black/50 backdrop-filter backdrop-blur-sm top-0 left-0 bg-blac flex justify-center items-center">
                <div className="w-96 flex flex-col justify-center items-center bg-white rounded text-black p-2 gap-6">
                    <div className="w-full flex justify-center items-center">
                        <p className="w-full font-bold text-lg text-slate-700">
                            {generalTitle || 'Informações do Serviço'}
                        </p>
                        <button onClick={onClose} className="w-4 text-slayte-700">
                            X
                        </button>
                    </div>
                    {children && children}{' '}
                    {!children && (
                        <div className="w-full flex flex-col gap-6 ">
                            <img
                                className="max-w-5xl h-42 max-h-42 border-2 flex shadow-md"
                                src={images}
                                alt="aaa"
                            />
                            <div className="w-full flex flex-col text-start px-2 gap-3">
                                <input
                                    type="text"
                                    value={title}
                                    placeholder="nome do trabalho"
                                />
                                <input
                                    type="text"
                                    value={description}
                                    placeholder="descricao do trabalho"
                                />
                                <input type="text" value={location?.cep} placeholder="CEP" />
                                <input
                                    type="text"
                                    value={location?.city}
                                    placeholder="Cidade"
                                />
                                <input type="text" value={location?.uf} placeholder="UF" />
                                <input type="number" value={price} placeholder="Preço" />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}
