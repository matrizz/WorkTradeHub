'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect, Suspense } from 'react'
import Services from '../../components/services'
import { KeyboardBackspace } from '@mui/icons-material'
import Loading from '@/app/components/loading'

async function getUser(user: string) {
    const response = await fetch(`/api/auth/user/u/${user}`)
    const data = await response.json()
    return data
}

async function getUserWithAuth(user: string, auth: string) {
    const response = await fetch(`/api/auth/user/${user}`, {
        headers: {
            'X-Authorization': `${auth}`
        }
    })
    const { data } = await response.json()
    console.log(auth)
    return data
}

async function getUserServices(user: string, auth: string) {
    const response = await fetch(`/api/auth/user/services?u=${user}`, {
        headers: { 'X-Authorization': `${auth}` }
    })
    const { data } = await response.json()
    return data
}

async function getAllServices(auth: string) {
    const response = await fetch(`/api/auth/services`, {
        headers: { 'X-Authorization': `${auth}` }
    })
    const { data } = await response.json()
    return data
}

export default function Profile() {
    const [jobs, setJobs] = useState<any[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [currentUser, setCurrentUser] = useState<any>()
    const [isLoading, setIsLoading] = useState(true)

    const route = useRouter()

    async function excludeService(id: string) {
        confirm('Tem certeza que deseja excluir esse serviço?')?
        fetch(`/api/auth/services/${id}`, {
            method: 'DELETE',
            headers: { 'X-Authorization': `${sessionStorage.getItem('tk')}` }
            }).then(async (res) => {                
                return await res.json()
            }).then(async (res) => {
                alert(res)              
                console.log(res)  
            })

            : null 
    } 

    useEffect(() => {
        ; (async () => {
            const user = await getUserWithAuth(
                `${sessionStorage.getItem('cuid')}`,
                `${sessionStorage.getItem('tk')}`
            )
            const services = await getUserServices(
                `${sessionStorage.getItem('cuid')}`,
                `${sessionStorage.getItem('tk')}`
            )
            setCurrentUser(user)
            setJobs(services)
            setIsLoading(false)
        })()
    }, [])

    if (!jobs) return <Loading />

    return (
        <div>
            <div className="mx-auto bg-white flex flex-col min-h-screen gap-20">
                <header className="h-28 flex items-center bg-slate-700 border-b-2 gap-2 px-8 py-1">
                    <script src="https://unpkg.com/react/umd/react.development.js"></script>
                    <script src="https://unpkg.com/react-dom/umd/react-dom.development.js"></script>
                    <script src="https://unpkg.com/@babel/standalone/babel.js"></script>
                    <script src="https://cdn.tailwindcss.com"></script>
                    <link
                        rel="stylesheet"
                        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
                    />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
                        rel="stylesheet"
                    />

                    <button
                        onClick={() => route.back()}
                        className="text-xl font-bold hover:-translate-x-3 transition-all duration-300 flex gap-2 justify-center items-center">
                        <KeyboardBackspace className="w-6 h-6" />
                    </button>
                    <h1 className="text-3xl font-bold text-white tracking-[0.05rem] italic">
                        WorkTradeHub
                    </h1>
                </header>
                <div className="flex flex-col items-center gap-10 p-8 bg-white min-h-screen">
                    <div className="flex flex-col items-center">
                        <img
                            src={
                                currentUser?.avatar_url ||
                                'https://cdn-icons-png.flaticon.com/512/11476/11476369.png'
                            }
                            alt={`Profile picture of ${currentUser?.name}`}
                            className="rounded-full w-24 h-24"
                        />
                        <h1 className="text-2xl text-slate-700 font-bold mt-4">
                            {currentUser?.name}
                        </h1>
                        <p className="text-gray-600">{currentUser?.email}</p>
                        <div className="flex items-center mt-2 text-gray-500">
                            <i className="fas fa-map-marker-alt mr-2"></i>
                            <span>
                                Brasil, {currentUser?.location.city} -{' '}
                                {currentUser?.location.uf}
                            </span>

                            {currentUser?.social && (
                                <>
                                    <i className="fas fa-globe ml-4 mr-2"></i>
                                    <span>{currentUser?.social}</span>
                                </>
                            )}

                            {currentUser?.site_link && (
                                <>
                                    <i className="fas fa-link ml-4 mr-2"></i>
                                    <span>{currentUser?.site_link}</span>
                                </>
                            )}
                        </div>
                        <div className="flex mt-4">
                            {/* <button className="border border-slate-700 text-slate-700 hover:bg-slate-700 hover:text-white px-4 py-2 rounded mr-2 transition-all duration-300">
                                Editar Perfil
                            </button> */}
                            <button
                                onClick={() =>
                                    window.navigator.clipboard.writeText(
                                        `${window.location.hostname}/${currentUser?.name.replaceAll(' ', '%20')}`
                                    )
                                }
                                className="text-gray-400 border hover:border-slate-700 hover:text-slate-700 px-4 py-2 rounded tramsition-all duration-300">
                                Compartilhar
                            </button>
                        </div>
                    </div>
                    <div className="flex group transition-all duration-300">
                        <button onClick={() => route.push('/services/create')} className="group-hover:border-slate-700 group-hover:text-slate-700 text-gray-400 text-lg text-center border-2 p-2 rounded-l-lg flex justify-end hover:text-slate-700 transition-all duration-300">
                            Criar novo serviço
                        </button>
                        <button className="group-hover:border-slate-700  group-hover:text-slate-700 duration-300 w-10 text-gray-400 text-center border-y-2 border-r-2 rounded-r-lg flex justify-center items-center hover:text-slate-700 hover:border-slate-700 transition-all duration-2 ">
                            +
                        </button>

                    </div>
                    <div className="flex mt-8 w-full max-w-4xl justify-between">
                        <div className="flex space-x-8">
                            <p className="text-blue-600 border-b-2 border-blue-600 pb-2">
                                Trabalhos Criados
                            </p>
                            {/* <a href="#" className="text-gray-600 pb-2">
                                Trabalhos Realizados
                            </a> */}
                        </div>
                    </div>
                    <section className="flex flex-wrap justify-center mt-4 py-4">
                        {jobs.map((item, i) => (
                            <Services
                                key={i}
                                title={item.title}
                                description={item.description}
                                price={item.price}
                                images={item.images}
                                location={item.location}
                                leftButton={{
                                    onclick() { route.push(`/services/${item.id}/edit`); },
                                    text: 'Editar'
                                }}
                                rightButton={{
                                    onclick() { excludeService(item.id)  },
                                    text: 'Excluir'
                                }}
                                centerButton={{
                                    text: "Candidatos",
                                    onclick: () => route.push(`/services/${item.id}/candidates`)
                                }}
                            />
                        ))}
                    </section>
                </div>
            </div>
        </div>
    )
}
