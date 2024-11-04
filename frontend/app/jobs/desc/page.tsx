'use client'
import Scaffold from "@/app/components/scaffold";
import { useState, useEffect, FormEvent } from "react";
import { KeyboardBackspace } from "@mui/icons-material";
import ListServiceItem from "@/app/components/services/ListServiceItem";
import Input from "@/app/components/services/InputService";


export default function Desc() {
    const [userData, setUserData] = useState<any>(null);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [formData, setFormData] = useState<any>({
        name: '',
        email: '',
        bio: '',
        avatar_url: ''
    });

    useEffect(() => {
        const fetchUserData = async () => {
            const response = await fetch('http://localhost:5000/api/users/6');
            const data = await response.json();
            setUserData(data);
            setFormData({
                name: data.name,
                email: data.email,
                avatar_url: data.avatar_url
            });
        };

        fetchUserData();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/users/6', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            const data = await response.json();
            setUserData(data);
            setEditMode(false);
        } else {
            console.error('Erro ao atualizar perfil');
        }
    };

    if (!userData) {
        return <div>Carregando...</div>;
    }

    return (
        <Scaffold header={<Header />}
            styles={{
                header: 'bg-slate-800 h-36 w-full px-2 py-3',
                main: 'bg-white text-black w-full py-10 px-0 flex flex-col gap-8',
                footer: 'bg-slate-800 h-32 w-full'
            }}>
        
        
            <div className="flex justify-center items-center  w-[100%] h-48  bg-slate-200 "></div>

            <div className="flex justify-right p-4 items-center w-full h-7 ">
                <button className='text-xl font-bold  transition-all duration-300 gap-2 flex items-center w-72 h-7'>About Work<KeyboardBackspace className='rotate-180' /></button>
            </div>

        <div className="justify-center items-center flex h-full w-full flex-col gap-12">
            <div className="flex justify-center items-center w-full h-10 p-3">
            <Input placeholder='nome:'/>
            </div>

            <div className="flex justify-center items-center w-full h-10 p-3">
                <Input placeholder='Endereço:' />
            </div>

            <div className="flex justify-center items-center w-full h-10 p-3">
                <Input placeholder='Telefone:' />
            </div>

            <div className="flex justify-center items-center w-full h-10 p-3">
                <Input placeholder='descrição:' isTextArea={true} />
            </div>

            <div className="flex justify-center items-center w-full h-10 p-3">
                <Input placeholder='Prazo:' />
            </div>
        </div>
        </Scaffold>
    )
}

const Header = () => {
    return (
        <div className='w-full h-full flex items-center justify-between px-6 py-1'>
            <button className='text-xl font-bold hover:-translate-x-3 transition-all duration-300 flex gap-2 justify-center items-center'><KeyboardBackspace className='w-20 h-20' /><p className='justify-center items-center text-lg'>Home</p></button>
                <div className='text-right flex flex-col gap-1'>
                    {/* <p className='font-bold text-lg'>Robert Luiz</p>
                    <p className='text-sm'>Desenvolvedor Front-End</p> */}
                </div>
                <div className='border-2 border-white w-20 h-20 rounded-full'></div>
            </div>
        
    )
}