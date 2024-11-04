export default function Input({ placeholder, isTextArea }: { placeholder: string, isTextArea?: boolean }) {
    return (
        <>
            { isTextArea ?
                <textarea placeholder={placeholder} className="text-lg my-4 placeholder:text-white bg-slate-800 shadow-md rounded-lg w-full h-24 border-none outline-none p-4  transition duration-500 text-white justify-center " name="description"></textarea>
                :
                <input placeholder={placeholder} className="text-lg my-2 placeholder:text-white bg-slate-800 shadow-md rounded-lg w-full h-16 border-none outline-none p-4  transition duration-500 text-white justify-center "></input>

            }
        </>
    )
}