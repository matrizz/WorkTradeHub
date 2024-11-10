'use client'

import { useRouter } from "next/router";
import DescProfile from "../components/descProfile";
import { useState, useEffect } from "react";
import Services from "../components/services";

interface User {
    cuid: string
    name: string
    cpf: string
    email: string
    password: string
    role: "user" | "admin"
}

export default function Profile() {

    const [jobs, setJobs] = useState<any[]>([]);

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
                <div className="flex flex-col justify-between items-center shadow-xl border-t-2 border-x-2 rounded-lg py-4 px-10 gap-4">
                    <div className="flex justify-center gap-8">

                        <div className="flex items-center gap-4 py-4">
                            <img className="min-w-56 h-56 border-2 rounded-full" src="" alt="" />
                        </div>
                        <div className="w-96 flex flex-col justify-around py-2">
                            <input className="border-b-2 border-slate-600 px-2 outline-none text-black" type="text" placeholder="Nome" />
                            <input className="border-b-2 border-slate-600 px-2 outline-none text-black" type="text" placeholder="Habilidade Específica ex: 'Desenvolvedor Front-end'" />
                            <input className="border-b-2 border-slate-600 px-2 outline-none text-black" type="text" placeholder="Habilidades Complementares" />
                            <input className="border-b-2 border-slate-600 px-2 outline-none text-black" type="text" placeholder="Endereço" />
                        </div>
                        
                    </div>
                    <div className="w-full flex justify-center gap-20 px-10">
                        <button className="w-80 h-10 bg-slate-800 text-white px-2">Editar </button>
                    </div>
                </div>

                <div className="w-full flex flex-col gap-2">
                    <h1 className="w-full flex justify-center text-4xl font-bold text-slate-700">Serviços Criados</h1>
                </div>

                <div className="p-4 rounded-lg flex justify-center flex-wrap gap-4">
                    <Services title="alguma coisa ai" description="slala" price="R$ 0,00" images="a" onClick={() => { }} location="brazil" textOne="Excluir" textTwo="Editar"/>
                    <Services title="alguma coisa ai" description="slala" price="R$ 0,00" images="a" onClick={() => { }} location="brazil" textOne="Excluir" textTwo="Editar"/>
                    <Services title="alguma coisa ai" description="slala" price="R$ 0,00" images="a" onClick={() => { }} location="brazil" textOne="Excluir" textTwo="Editar"/>
                    <Services title="alguma coisa ai" description="slala" price="R$ 0,00" images="a" onClick={() => { }} location="brazil" textOne="Excluir" textTwo="Editar"/>
                    <Services title="alguma coisa ai" description="slala" price="R$ 0,00" images="a" onClick={() => { }} location="brazil" textOne="Excluir" textTwo="Editar"/>
                    <Services title="alguma coisa ai" description="slala" price="R$ 0,00" images="a" onClick={() => { }} location="brazil" textOne="Excluir" textTwo="Editar"/>
                    <Services title="alguma coisa ai" description="slala" price="R$ 0,00" images="a" onClick={() => { }} location="brazil" textOne="Excluir" textTwo="Editar"/>
                    <Services title="alguma coisa ai" description="slala" price="R$ 0,00" images="a" onClick={() => { }} location="brazil" textOne="Excluir" textTwo="Editar"/>
                    <Services title="alguma coisa ai" description="slala" price="R$ 0,00" images="a" onClick={() => { }} location="brazil" textOne="Excluir" textTwo="Editar"/>
                    <Services title="alguma coisa ai" description="slala" price="R$ 0,00" images="a" onClick={() => { }} location="brazil" textOne="Excluir" textTwo="Editar"/>
                    <Services title="alguma coisa ai" description="slala" price="R$ 0,00" images="a" onClick={() => { }} location="brazil" textOne="Excluir" textTwo="Editar"/>
                    <Services title="alguma coisa ai" description="slala" price="R$ 0,00" images="a" onClick={() => { }} location="brazil" textOne="Excluir" textTwo="Editar"/>
                    <Services title="alguma coisa ai" description="slala" price="R$ 0,00" images="a" onClick={() => { }} location="brazil" textOne="Excluir" textTwo="Editar"/>
                    <Services title="alguma coisa ai" description="slala" price="R$ 0,00" images="a" onClick={() => { }} location="brazil" textOne="Excluir" textTwo="Editar"/>
                    <Services title="alguma coisa ai" description="slala" price="R$ 0,00" images="a" onClick={() => { }} location="brazil" textOne="Excluir" textTwo="Editar"/>
                    <Services title="alguma coisa ai" description="slala" price="R$ 0,00" images="a" onClick={() => { }} location="brazil" textOne="Excluir" textTwo="Editar"/>
                    <Services title="alguma coisa ai" description="slala" price="R$ 0,00" images="a" onClick={() => { }} location="brazil" textOne="Excluir" textTwo="Editar"/>
                    <Services title="alguma coisa ai" description="slala" price="R$ 0,00" images="a" onClick={() => { }} location="brazil" textOne="Excluir" textTwo="Editar"/>
                    <Services title="alguma coisa ai" description="slala" price="R$ 0,00" images="a" onClick={() => { }} location="brazil" textOne="Excluir" textTwo="Editar"/>
                    <Services title="alguma coisa ai" description="slala" price="R$ 0,00" images="a" onClick={() => { }} location="brazil" textOne="Excluir" textTwo="Editar"/>
                    <Services title="alguma coisa ai" description="slala" price="R$ 0,00" images="a" onClick={() => { }} location="brazil" textOne="Excluir" textTwo="Editar"/>
                </div>
            </main>
        </div>
    )
}