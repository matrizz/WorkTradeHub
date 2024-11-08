'use client'
import Scaffold from "../components/scaffold";
import Card from '../components/services';
import ListServiceItem from "../components/services/ListServiceItem";
import { KeyboardBackspace } from "@mui/icons-material";


export default function Search() {
    return (
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
                main: 'bg-white text-black w-full py-10 px-0 flex flex-col gap-10',
                footer: 'bg-slate-800 h-32 w-full'
            }}>

            <div className="justify-center items-center flex w-full h-full">
                <div className="flex justify-center items-center  w-[100%] h-48  bg-slate-200 "></div>
            </div>

            <div className="flex justify-right p-4 items-center w-full h-7 ">
            <button className='text-xl font-bold  transition-all duration-300 gap-2 flex items-center w-72 h-7'>Section title<KeyboardBackspace className='rotate-180' /></button>
            </div>

            <div className="">
                {Array.from({ length: 50 }).map((item, index) => <ListServiceItem key={index} />)}
            </div>
        </Scaffold>






    )
}
