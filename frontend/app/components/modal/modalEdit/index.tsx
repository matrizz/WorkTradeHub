import { Description } from "@mui/icons-material"

interface detailsItemProps {
    name: string,
    isOpen: boolean,
    skills: string,
    adress: string,
    complementSkills: string,
    image: string,
    setModalOpen: () => void
}

export default function ModalEdit({ name, isOpen, skills, adress, complementSkills, image, setModalOpen }: detailsItemProps) {

    if (isOpen) {
        return (
            <div className="fixed transition-all ease-in-out w-full h-full bg-black/50 backdrop-filter backdrop-blur-sm top-0 left-0 bg-blac flex justify-center items-center">
                <div className="w-96 flex flex-col justify-center items-center bg-white rounded text-black p-2 gap-6">
                    <div className="w-full flex justify-center items-center">
                        <p className="w-full font-bold text-lg text-slate-700">
                            Editar Informações
                        </p>
                        <button onClick={setModalOpen} className="w-4 text-slayte-700">X</button>
                    </div>

                    <div className="w-full flex flex-col gap-6 ">
                        <img className="max-w-5xl h-42 max-h-42 border-2 flex shadow-md" src={image} alt="aaa" />
                        <div className="w-full flex flex-col text-start px-2 gap-3" >
                            <p className="font-bold text-lg">{name}</p>
                            <div className="w-full flex flex-col justify-between items-end">
                                <div className="w-full text-justify flex flex-col justify-center gap-4 text-sm text-gray-400">
                                    <p className="w-full flex justify-center items-center">{skills}</p>
                                    <p className="text-gray-600 font-bold">{complementSkills}</p>
                                </div>
                                <p className="font-bold text-lg">{adress}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}