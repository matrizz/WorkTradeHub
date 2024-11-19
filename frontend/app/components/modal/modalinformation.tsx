interface ModalInformationProps {
    isOpen: boolean
}

export default function ModalInformation({ isOpen }: ModalInformationProps) {

    if (isOpen) {
        return (
            <div className="w-full h-full absolute z-50 flex justify-center items-center bg-red-600 text-black">
                <p>
                    ModalInformation
                </p>
            </div>
        )
    }

}