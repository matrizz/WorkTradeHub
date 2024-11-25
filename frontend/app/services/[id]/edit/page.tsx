'use client'
import Loading from '@/app/components/loading'
import Scaffold from '@/app/components/scaffold'
import VerificarCep from '@/app/utils/cep'
import { Service } from '@prisma/client'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import React, { useState, useEffect, FormEvent } from 'react'

export default function Profile() {
    
    const [userData, setUserData] = useState<any>(null)
    const [serviceId, setServiceId] = useState('')
    const [editMode, setEditMode] = useState<boolean>(false)

    const [categoria, setCategoria] = useState<string>('')
    // const [imagem, setImagem] = useState<string>('')
    const [preco, setPreco] = useState<number>(0)
    const [desc, setDesc] = useState<string>('')

    const [dados, setDados] = useState<any>()

    const [estado, setEstado] = useState<string>('')
    const [cep, setCep] = useState('')
    const [bairro, setBairro] = useState<any>()
    const [rua, setRua] = useState<any>()
    const [cidade, setCidade] = useState<any>()
    const [numero, setNumero] = useState<number>()
    const [presencial, setPresencial] = useState<boolean>(true)
    const [service, setService] = useState<Service>()

    const router = useRouter()

    interface ServiceProps {
        category: string,
        images: string | string[],
        location: object,
        price: number | string,
        description: string
    }

    function createServiceObj(props: Service) {

        //@ts-ignore
        const service: Service = {
            category: props?.category,
            images: props?.images,
            location: props?.location,
            price: props?.price,
            description: props?.description
        }
        return service

    }

    useEffect(() => {
        const fetchUserData = async () => {
            const response = await fetch(
                `/api/auth/user/${sessionStorage.getItem('cuid')}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Authorization': `${sessionStorage.getItem('tk')}`
                    }
                }
            )
            const data = await response.json()
            setUserData(data)

        }

        const fetchUserService = async () => {
            console.log("id serviço:", window.location.pathname.split('/')[window.location.pathname.split('/').length - 2])
            const response = await fetch(
                `/api/auth/services/${window.location.pathname.split('/')[window.location.pathname.split('/').length - 2]}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Authorization': `${sessionStorage.getItem('tk')}`
                    }
                }
            )
            const {data} = await response.json()
            console.log("AAAAAAAAAAAAa", data)
            setBairro(data.location.bairro)
            setCidade(data.location.cidade)
            setEstado(data.location.estado)
            setPreco(data.price)
            setCep(data.location.cep)
            setRua(data.location.rua)
            setDesc(data.description)
            setNumero(data.location.numero)
            console.log(data.description)
            setCategoria(data.category)

        }

        fetchUserData()
        fetchUserService()
    }, [])


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        const response = await fetch(
            `/api/auth/services/${window.location.pathname.split('/')[window.location.pathname.split('/').length - 2]}`,
            {
                method: 'PUT',
                headers: {
                    'X-Authorization': `${sessionStorage.getItem('tk')}`
                },
                //@ts-ignore
                body: JSON.stringify({
                    id: sessionStorage.getItem('cuid'),
                    category: categoria,
                    location: {
                        cep,
                        cidade,
                        rua,
                        estado,
                        bairro,
                        numero
                    },
                    price: preco,
                    description: desc
                })
            }
        )
        console.log(response)

        if (response.ok) {
            const data = await response.json()
            setUserData(data)
            router.back()
            
        } else {
            console.error('Erro ao atualizar perfil')
        }
    }


    function handleCepApi(cep: string) {
        setCep(cep)
        setTimeout(async () => {
            const response = await new VerificarCep(cep).buscarCep()
            setDados(response)
            //@ts-ignore
            setCidade(response?.cidade)
            //@ts-ignore
            setEstado(response?.estado)
            console.log(response)
        }, 500)
    }

    if (!userData) {
        return <Loading />
    }

    return (
        <Scaffold header={<Header />}>
            <div className=" flex items-center flex-col h-full gap-20">

                <h1 className='text-2xl md:text-4xl font-bold text-slate-700'>Editar serviço</h1>
                <div className="w-md px-4 py-4 bg-white rounded-xl shadow-md flex flex-col justify-center items-center md:w-4/5 gap-6">

                    <div className='w-full'>
                        <p className='md:text-xl text-slate-700 font-bold'>Endereço</p>
                    </div>
                    <div className='w-full flex gap-2'>
                        <div className='w-full flex flex-col gap-2'>
                            {/** @ts-ignore */}
                            <input type="number" disabled={!presencial} placeholder='CEP' className='px-2 border w-full text-md md:text-lg p-1 rounded-lg border-slate-700 outline-none' value={cep} onChange={(e) => handleCepApi(e.target.value)} />
                            {/** @ts-ignore */}
                            <input type="text" disabled={!presencial} placeholder='Cidade' className='px-2 border w-full text-md md:text-lg p-1 rounded-lg border-slate-700 outline-none' defaultValue={cidade} readOnly />
                            {/** @ts-ignore */}
                            <input type="text" disabled={!presencial} placeholder='Estado' className='px-2 border w-full text-md md:text-lg p-1 rounded-lg border-slate-700 outline-none' defaultValue={estado} readOnly />
                        </div>
                        <div className='w-full flex flex-col gap-2'>    
                            <input type="text" disabled={!presencial} placeholder='Rua' className='px-2 border w-full text-md md:text-lg p-1 rounded-lg border-slate-700 outline-none' value={rua} onChange={(e) => setRua(e.target.value)} />
                            <input type="number" disabled={!presencial} placeholder='Número' className='px-2 border w-full text-md md:text-lg p-1 rounded-lg border-slate-700 outline-none' value={numero} onChange={(e) => setNumero(+e.target.value)} />
                            <input type="text" disabled={!presencial} placeholder='Bairro' className='px-2 border w-full text-md md:text-lg p-1 rounded-lg border-slate-700 outline-none' value={bairro} onChange={(e) => setBairro(e.target.value)} />
                        </div>
                    </div>
                    <div className='w-6/12 self-start text-center items-center px-4 gap-2 flex'>
                        <input className="size-3 " type="checkbox" id="presencial" checked={presencial} onChange={(e) => setPresencial(e.target.checked)} />
                        <label htmlFor="presencial">Presencial</label>
                    </div>
                    <div className='w-full'>
                        <p className='md:text-xl text-slate-700 font-bold'>Informações do Serviço</p>
                    </div>
                    <div className='w-full flex flex-col gap-2'>
                        <div className='w-full flex gap-2'>
                            <input type="text" value={categoria} onChange={(e) => setCategoria(e.target.value)} placeholder='Categoria' className='px-2 border w-full p-1 text-md md:text-lg border-slate-700 rounded-lg outline-none ' name="" />
                            <input type="number" value={preco} onChange={(e) => setPreco(+e.target.value > 0 ? +e.target.value : 0)} placeholder='Preço' className='px-2 border w-full p-1 text-md md:text-lg border-slate-700 rounded-lg outline-none ' name="" />
                        </div>
                        <textarea placeholder='Descrição' defaultValue={desc} className='px-2 border w-full min-h-24 p-1 text-md md:text-lg border-slate-700 rounded-lg outline-none ' />
                    </div>

                    <div className='w-full flex justify-center'>
                        <button className='w-1/3 h-10 bg-slate-700 text-white rounded-lg' onClick={handleSubmit}>Atualizar</button>
                    </div>
                </div>
            </div>
        </Scaffold>
    )
}

const Header = () => {
    return (
        <div className="w-full h-full flex items-center justify-between px-6 py-1">
            <p className="text-lg font-bold hover:-translate-x-3 transition-all duration-300">
                WorkTradeHub
            </p>
        </div>
    )
}
