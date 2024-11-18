'use client'

import { useRouter } from "next/router";
import DescProfile from "../components/descProfile";
import { useState, useEffect } from "react";
import Services from "../components/services";
import { UserProps } from "@/prisma/prisma";

interface User {
    cuid: string
    name: string
    cpf: string
    email: string
    password: string
    role: "user" | "admin"
}

export default function Profile() {

    const [jobs, setJobs] = useState<any[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState<UserProps>({} as UserProps)

    useEffect(() => {
        (async () => {
            const response = await fetch(`http://localhost:3000/api/auth/user/services?u=${sessionStorage.getItem('cuid')}`, { headers: { "X-Authorization": `${sessionStorage.getItem('tk')}` } });
            const userdata = await fetch(`http://localhost:3000/api/auth/user/${sessionStorage.getItem('cuid')}`, { headers: { "X-Authorization": `${sessionStorage.getItem('tk')}` } });
            const { data: user } = await userdata.json();
            const { data } = await response.json();
            setJobs(data)
            setCurrentUser(user)

        })()
    }, [])

    return (
        <div className="mx-auto bg-white flex flex-col  gap-20">
            <header className="h-28 flex justify-between items-center bg-slate-700 border-b-2 px-8 py-1">
                <script src="https://unpkg.com/react/umd/react.development.js"></script>
                <script src="https://unpkg.com/react-dom/umd/react-dom.development.js"></script>
                <script src="https://unpkg.com/@babel/standalone/babel.js"></script>
                <script src="https://cdn.tailwindcss.com"></script>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
                <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet" />

                <h1 className="text-3xl font-bold text-white tracking-[0.05rem] italic">WorkTradeHub</h1>

            </header>


            <div className="w-full flex flex-col gap-2">
                <h1 className="w-full flex justify-center text-4xl font-bold text-slate-700">Configurações do Usuário</h1>
                <h1 className="w-full flex justify-center text-4xl font-bold text-slate-700">Ambiente Pessoal</h1>
            </div>
            <main className="w-full flex flex-col justify-center items-center gap-20 py-4">
                <div className="flex w-11/12 flex-col justify-between items-center shadow-xl border-t border-x rounded py-10 px-10 gap-4">
                    <div className="flex flex-col w-full gap-8 md:flex-row md:items-start md:justify-start">

                        <div className="flex justify-center items-start gap-4 py-4 md:justify-start">
                            <img className="min-w-56 h-56 border-2 rounded-full" src="https://avatars.githubusercontent.com/u/95687945?v=4" alt="" />
                        </div>
                        <div className="w-full flex text-gray-400 flex-col justify-evenly py-2 gap-4">
                            <div>
                                <div className="w-full flex flex-col">
                                    <label htmlFor="name">Nome:</label>
                                    <input name="name" className="border rounded py-1 border-slate-600 px-2 outline-none text-black" readOnly defaultValue={currentUser.name} type="text" placeholder="Nome" />
                                </div>
                                <div className="w-full flex flex-col">
                                    <label htmlFor="cpf">CPF:</label>
                                    <input name="cpf" className="border rounded py-1 border-slate-600 px-2 outline-none text-black" readOnly defaultValue={currentUser.cpf} type="text" placeholder="Habilidade Específica ex: 'Desenvolvedor Front-end'" />
                                </div>
                            </div>
                            <div className="w-full flex flex-col">
                                <label htmlFor="email">Email:</label>
                                <input name="email" className="border rounded py-1 border-slate-600 px-2 outline-none text-black" readOnly defaultValue={currentUser.email} type="text" placeholder="Habilidades Complementares" />
                            </div>
                            <div>
                                <div className="w-full flex flex-col">
                                    <label htmlFor="city">Cidade:</label>
                                    <input name="city" className="border rounded py-1 border-slate-600 px-2 outline-none text-black" readOnly defaultValue={currentUser.location?.city} type="text" placeholder="Cidade" />
                                </div>
                                <div className="w-full flex flex-col">
                                    <label htmlFor="cep">CEP:</label>
                                    <input name="cep" className="border rounded py-1 border-slate-600 px-2 outline-none text-black" readOnly defaultValue={currentUser.location?.cep} type="text" placeholder="CEP" />
                                </div>
                                <div className="w-full flex flex-col">
                                    <label htmlFor="uf">UF/Estado:</label>
                                    <input name="uf" className="border rounded py-1 border-slate-600 px-2 outline-none text-black" readOnly defaultValue={currentUser.location?.uf} type="text" placeholder="uf" />
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="w-full flex justify-center gap-20 px-10">
                        <button className="w-80 h-10 bg-slate-800 text-white px-2">Editar</button>
                    </div>
                </div>

                <div className="w-full flex flex-col gap-2">
                    <h1 className="w-full flex justify-center text-4xl font-bold text-slate-700">Serviços Criados</h1>
                </div>

                <div className="p-4 rounded-lg flex justify-center flex-wrap gap-4">
                    {
                        jobs.map((job, i) => (
                            <Services onOpen={() => { setIsModalOpen(true) }}
                                key={i} title={job.name} images={job.images} isModalOpen={isModalOpen} description={job.description} price={job.price} location={job.location} onClick={() => { setIsModalOpen(true) }} onClose={() => { setIsModalOpen(false) }} primaryText="Conversar" secondaryText="Candidatar-se"
                            />))

                    }</div>
            </main>
        </div>
    )
}