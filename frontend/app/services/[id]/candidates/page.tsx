'use client'

import Loading from "@/app/components/loading";
import Scaffold from "@/app/components/scaffold";
import { Candidate } from "@prisma/client";
import { useEffect, useRef, useState } from "react";

export default function Candidates() {

    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([]);

    const [searchById, setSearchById] = useState('');
    const [searchByName, setSearchByName] = useState('');

    const [orderByName, setOrderByName] = useState('');
    const [filterByStatus, setFilterByStatus] = useState('');

    const filterInput = useRef<HTMLInputElement>(null);

    useEffect(() => {
        (async () => {
            const response = await fetch(`/api/auth/services/${window.location.pathname.split('/')[window.location.pathname.split('/').length - 2]}/candidate`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': `${sessionStorage.getItem('tk')}`
                }
            })
            const { data } = await response.json();
            setCandidates(data);
            setFilteredCandidates(data); // Inicializar com todos os candidatos
        })();
    }, []);
    //@ts-ignore
    const filterCandidates = (e) => {
        e.preventDefault();
        const nameFilter = searchByName.toLowerCase();
        const idFilter = searchById;
        const nameOrder = orderByName;
        const statusFilter = filterByStatus;

        let filtered = candidates.filter(candidate =>
            (nameFilter ? candidate.clientName.toLowerCase().includes(nameFilter) : true) &&
            (idFilter ? candidate.id.includes(idFilter) : true) &&
            (statusFilter ? candidate.status === statusFilter : true)
        );

        if (nameOrder) {
            filtered = filtered.sort((a, b) => {
                if (nameOrder === 'A-Z') {
                    return a.clientName.localeCompare(b.clientName);
                } else if (nameOrder === 'Z-A') {
                    return b.clientName.localeCompare(a.clientName);
                }
                return 0;
            });
        }

        setFilteredCandidates(filtered);
    };

    const [colWidths, setColWidths] = useState([400, 200, 100, 200, 200, /*200*/]);

    const headersRef = useRef<(HTMLTableCellElement | null)[]>([]);

    const handleMouseDown = (index: number, e: React.MouseEvent) => {
        const startX = e.clientX;
        const startWidth = headersRef.current[index]?.offsetWidth ?? 0;

        document.body.style.userSelect = "none";
        document.body.style.cursor = "ew-resize";
        const onMouseMove = (e: MouseEvent) => {
            const newWidth = startWidth + (e.clientX - startX);
            const newColWidths = [...colWidths];
            newColWidths[index] = newWidth;
            setColWidths(newColWidths);
        };

        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.body.style.cursor = "";
            document.body.style.userSelect = "";
            document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };

    if (!candidates) return <Loading />

    return (
        <Scaffold header={<Header />}>
            <div className="w-full h-full bg-gray-100 shadow-md p-2 flex flex-col gap-4 rounded">
                <div>
                    <p className="text-lg md:text-2xl">Tabela de Candidatos</p>
                </div>
                <form className="w-full flex flex-col md:flex-row gap-4" onSubmit={filterCandidates}>

                    <div className="w-full max-w-sm min-w-[200px]">
                        <label className="block ml-1 mb-1 text-sm text-slate-800">
                            Nome
                        </label>
                        <div className="relative">
                            {/* @ts-ignore */}
                            <select ref={filterInput} value={orderByName} onChange={(e) => setOrderByName(e.target.value)} className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer">
                                <option value="">Ordenar por</option>
                                <option value="A-Z">A-Z</option>
                                <option value="Z-A">Z-A</option>
                            </select>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.2" stroke="currentColor" className="h-5 w-5 ml-1 absolute top-2.5 right-2.5 text-slate-700">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                            </svg>
                        </div>
                    </div>

                    <div className="w-full max-w-sm min-w-[200px]">
                        <label className="block ml-1 mb-1 text-sm text-slate-800">
                            Status
                        </label>
                        <div className="relative">
                            <select value={filterByStatus} onChange={(e) => setFilterByStatus(e.target.value)} className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer">
                                <option value="">Todos</option>
                                <option value="accepted">Aceito</option>
                                <option value="pending">Pendente</option>
                                <option value="rejected">Recusado</option>
                            </select>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.2" stroke="currentColor" className="h-5 w-5 ml-1 absolute top-2.5 right-2.5 text-slate-700">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                            </svg>
                        </div>
                    </div>

                    <input value={searchByName} onChange={(e) => setSearchByName(e.target.value)} className="w-full self-end h-max shadow-sm py-1.5 px-2 text-lg outline-none border border-slate-200/50 rounded" placeholder="Pesquisa por Nome" type="text" />
                    <input value={searchById} onChange={(e) => setSearchById(e.target.value)} className="w-full self-end h-max shadow-sm py-1.5 px-2 text-lg outline-none border border-slate-200/50 rounded" placeholder="Pesquisa por ID" type="text" />
                    <button type="submit" className="w-1/4 self-end h-max shadow-sm py-1.5 px-2 text-lg bg-slate-600 text-white outline-none border border-slate-200/50 rounded">Filtrar</button>
                </form>

                <div className="w-full h-full flex overflow-y-scroll flex-col ">
                    {!candidates ? (
                        <Loading />
                    ) : (
                        <table className="table-auto min-w-full">
                            <thead>
                                <tr>
                                    {colWidths.map((w, i) => (
                                        <th
                                            key={i}
                                            // @ts-ignore
                                            ref={(el) => (headersRef.current[i] = el)}
                                            style={{ width: `${w}px` }}
                                            className="text-md resizeable resize py-1 pl-4 text-left outline-none border border-slate-400/30 rounded"
                                        >
                                            <div className="flex items-center justify-between">
                                                <span>{i === 0 ? "Nome" : i === 1 ? "ID do Candidato" : i === 2 ? "Status" : i === 3 ? "ID da Candidatura" : "Ações"}</span>
                                                {i < 5 && (
                                                    <div
                                                        className="cursor-ew-resize bg-transparent w-[0.3rem] h-6"
                                                        onMouseDown={(e) => handleMouseDown(i, e)}
                                                    ></div>
                                                )}
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {(filteredCandidates ? filteredCandidates : candidates).map((application, i) => (
                                    <tr key={i} className="hover:bg-gray-200 max-h-10 transition-all duration-300 ease-in-out">
                                        <td className="text-md py-1 px-2 text-gray-600 outline-none border border-slate-400/30 rounded">
                                            <a href={`/${application.clientName}`}>
                                                {application.clientName}
                                            </a>
                                        </td>
                                        <td className="text-md py-1 px-2 text-gray-600 outline-none border border-slate-400/30 rounded">
                                            {application.clientId}
                                        </td>
                                        <td className="text-md py-1 items-center gap-2 px-2 text-gray-600 outline-none border border-slate-400/30 rounded">
                                            <div className="flex items-center gap-2">
                                                <div className={`size-3 rounded-full ${application.status === 'pending' ? 'bg-yellow-400' : application.status === 'accepted' ? 'bg-green-400' : 'bg-red-500'}`}></div>{application.status === 'pending' ? 'pendente' : application.status === 'accepted' ? 'aceito' : 'recusado'}
                                            </div>
                                        </td>
                                        <td className="text-md py-1 px-2 text-gray-600 outline-none border border-slate-400/30 rounded">
                                            {application.id}
                                        </td>
                                        {/* <td className="text-md py-1 px-2 text-gray-600 outline-none border border-slate-400/30 rounded">
                      {candidate.createdAt}
                    </td> */}
                                        <td className=" py-1 px-2 gap-2 text-gray-600 outline-none border border-slate-400/30 ">
                                            <div className="flex w-full h-full justify-around">
                                                <button disabled={application.status !== 'pending'} onClick={async () => {
                                                    confirm('Tem certeza que deseja aceitar essa candidatura?') ?
                                                        await fetch(`/api/auth/services/accept`, {
                                                            method: 'POST',
                                                            headers: {
                                                                'X-Authorization': `${sessionStorage.getItem('tk')}`
                                                            },
                                                            body: JSON.stringify({
                                                                clientId: application.clientId,
                                                                serviceId: application.serviceId
                                                            })
                                                        }).then(async (res) => { return await res.json() }).then(async (res) => { console.log(res); window.location.reload() }) : null
                                                }} className="bg-slate-700 disabled:cursor-not-allowed h-min px-4 py-1 border border-slate-500 shadow-sm text-white font-bold rounded">Aceitar</button>
                                                <button disabled={application.status !== 'pending'} onClick={async () => {
                                                    confirm('Tem certeza que deseja recusar essa candidatura?') ?
                                                        await fetch(`/api/auth/services/reject`, {
                                                            method: 'POST',
                                                            headers: {
                                                                'X-Authorization': `${sessionStorage.getItem('tk')}`
                                                            },
                                                            body: JSON.stringify({
                                                                clientId: application.clientId,
                                                                serviceId: application.serviceId,
                                                                candidatureId: application.id
                                                            })
                                                        }).then(async (res) => { return await res.json() }).then(async (res) => { console.log(res); window.location.reload() }) : null
                                                }} className="h-min px-4 text-black disabled:cursor-not-allowed py-1 border border-slate-500 shadow-sm font-bold rounded">Recusar</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </Scaffold>
    )
}

const Header = () => {
    return (
        <div className="w-full h-full flex items-center justify-between px-6 py-1">
            <p className="text-xl font-bold hover:-translate-x-3 hover:cursor-pointer transition-all duration-300">
                WorkTradeHub
            </p>
        </div>
    )
}
