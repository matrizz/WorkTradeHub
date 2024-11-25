'use client'
import Loading from '@/app/components/loading'
import Scaffold from '@/app/components/scaffold'
import VerificarCep from '@/app/utils/cep'
import { useRouter } from 'next/navigation'
import React, { useState, useEffect, FormEvent } from 'react'

export default function Profile() {
	const [userData, setUserData] = useState<any>(null)

	const [categoria, setCategoria] = useState<string>('')
	// const [imagem, setImagem] = useState<string>('')
	const [preco, setPreco] = useState('')
	const [desc, setDesc] = useState('')
	const [titulo, setTitulo] = useState('')

	const [dados, setDados] = useState()

	const [estado, setEstado] = useState('')
	const [cep, setCep] = useState('')
	const [bairro, setBairro] = useState('')
	const [rua, setRua] = useState('')
	const [cidade, setCidade] = useState('')
	const [numero, setNumero] = useState('')
	const [presencial, setPresencial] = useState(true)

	const router = useRouter()

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

		fetchUserData()
	}, [])


	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()
		const fetchData = {
			id: sessionStorage.getItem('cuid'),
			category: categoria,
			title: titulo,
			price: preco,
			description: desc,
			online: !presencial
		}
		if (presencial) {
			// @ts-ignore
			fetchData.location = {
				cep,
				cidade,
				estado,
				rua,
				bairro,
				numero
			}
		}

		const response = await fetch(
			`/api/auth/services/create`,
			{
				method: 'POST',
				headers: {
					'X-Authorization': `${sessionStorage.getItem('tk')}`
				},
				//@ts-ignore
				body: JSON.stringify(fetchData)
			}
		)

		if (response.ok) {
			const data = await response.json()
			setUserData(data)
			router.back()
		} else {
			console.error('Erro ao atualizar perfil')
			alert('Erro ao atualizar perfil')
		}
	}


	function handleCepApi(cep: string) {
		setCep(cep)
		setTimeout(async () => {
			const response = await new VerificarCep(cep).buscarCep()
			//@ts-ignore
			setDados(response)
			//@ts-ignore
			setCidade(response?.cidade)
			//@ts-ignore
			setEstado(response?.estado)
		}, 500)
	}

	if (!userData) {
		return <Loading />
	}

	return (
		<Scaffold header={<Header />}>
			<div className=" flex items-center flex-col h-full gap-20">

				<h1 className='text-2xl md:text-4xl font-bold text-slate-700'>Cadastro de Serviços</h1>
				<div className="w-md px-4 py-4 bg-white rounded-xl shadow-md flex flex-col justify-center items-center md:w-4/5 gap-6">

					<div className='w-full'>
						<p className='md:text-xl text-slate-700 font-bold'>Endereço</p>
					</div>
					<div className='w-full flex gap-2'>
						<div className='w-full flex flex-col gap-2'>
							<input type="number" disabled={!presencial} placeholder='CEP' className='px-2 border w-full text-md md:text-lg p-1 rounded-lg border-slate-700 outline-none' value={cep} onChange={(e) => handleCepApi(e.target.value)} />
							{/* @ts-ignore */}
							<input type="text" disabled={!presencial} placeholder='Cidade' className='px-2 border w-full text-md md:text-lg p-1 rounded-lg border-slate-700 outline-none' value={cidade? cidade : ''} readOnly onChange={() => { }} />
							{/* @ts-ignore */}
							<input type="text" disabled={!presencial} placeholder='Estado' className='px-2 border w-full text-md md:text-lg p-1 rounded-lg border-slate-700 outline-none' value={estado? estado : ''} readOnly onChange={() => { }} />
						</div>
						<div className='w-full flex flex-col gap-2'>
							<input type="text" disabled={!presencial} placeholder='Rua' className='px-2 border w-full text-md md:text-lg p-1 rounded-lg border-slate-700 outline-none' value={rua} onChange={(e) => setRua(e.target.value)} />
							{/* @ts-ignore */}
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

							<input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder='Titulo' className='px-2 border w-full p-1 text-md md:text-lg border-slate-700 rounded-lg outline-none' name="titulo" />
							<input type="text" value={categoria} onChange={(e) => setCategoria(e.target.value)} placeholder='Categoria' className='px-2 border w-full p-1 text-md md:text-lg border-slate-700 rounded-lg outline-none' name="categoria" />
							{/* @ts-ignore */}
							<input type="number" value={preco} onChange={(e) => setPreco(+e.target.value > 0 ? +e.target.value : 0)} placeholder='Preço' className='px-2 border w-full p-1 text-md md:text-lg border-slate-700 rounded-lg outline-none' name="preco" />
						</div>
						<textarea placeholder='Descrição' defaultValue={desc} onChange={e => setDesc(e.target.value)} className='px-2 border w-full min-h-24 p-1 text-md md:text-lg border-slate-700 rounded-lg outline-none ' />
					</div>

					<div className='w-full flex justify-center'>
						<button className='w-1/3 h-10 bg-slate-700 text-white rounded-lg' onClick={handleSubmit}>Criar</button>
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
