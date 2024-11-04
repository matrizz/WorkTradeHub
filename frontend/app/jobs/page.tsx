import Scaffold from "../components/scaffold";
import { KeyboardBackspace } from "@mui/icons-material";

export default function Jobs() {
    return(

        <Scaffold
            header={
                <div className='w-full h-full flex items-center justify-between px-6 py-1'>
                    <button className='text-xl font-bold hover:-translate-x-3 transition-all duration-300 flex gap-2 justify-center items-center'><KeyboardBackspace className='w-6 h-6' /><p className='justify-center items-center text-lg'>Home</p></button>
                    <div className='h-ful rounded-lg px-4 flex justify-center items-center gap-2 hover:scale-105 transition-all duration-300'>
                        <div className='text-right flex flex-col gap-1'>
                            {/* <p className='font-bold text-lg'>{currentUser?.name.split(' ').slice(0, 2).join(' ')}</p> */}
                        </div>
                        <div className='border-2 border-white w-20 h-20 rounded-full'></div>
                    </div>
                </div>
            }
            styles={{
                header: 'bg-slate-800 h-36 w-full px-2 py-3',
                main: 'bg-white text-black w-full p-10 flex flex-col gap-10',
                footer: 'bg-slate-800 h-32 w-full'
            }}>

            <div className="flex justify-center items-center w-full h-7 gap-4">
            <button className="border-2 border-slate-800 rounded-xl w-20 h-10">Criado</button>
                <button className="border-2 border-slate-800 rounded-xl w-20 h-10">Atribuído</button>
            </div>

            

            </Scaffold>
    )
}