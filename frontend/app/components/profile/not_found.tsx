import { KeyboardBackspace } from "@mui/icons-material";

export default function UserNotFound() {
    return (
        <div>
            <div className="mx-auto bg-white flex flex-col min-h-screen gap-20">
                <header className="h-28 flex items-center bg-slate-700 border-b-2 gap-2 px-8 py-1">
                    <script src="https://unpkg.com/react/umd/react.development.js"></script>
                    <script src="https://unpkg.com/react-dom/umd/react-dom.development.js"></script>
                    <script src="https://unpkg.com/@babel/standalone/babel.js"></script>
                    <script src="https://cdn.tailwindcss.com"></script>
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
                    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet" />

                    <button className='text-xl font-bold hover:-translate-x-3 transition-all duration-300 flex gap-2 justify-center items-center'>
                        <KeyboardBackspace className='w-6 h-6' />
                    </button>
                    <h1 className="text-3xl font-bold text-white tracking-[0.05rem] italic">WorkTradeHub</h1>

                </header>
                <div className="flex flex-col text-slate-700 items-center p-8 bg-white min-h-max">
                    <div className="flex flex-col items-center">
                        <img src={"https://cdn-icons-png.flaticon.com/512/11476/11476369.png"} alt={`Profile picture`} className="opacity-20 rounded-full w-24 h-24" />

                        <p className="text-2xl text-slate-700/50 mt-4">Usuário não encontrado!</p>
                        <div className="flex items-center mt-2 text-gray-500">

                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}