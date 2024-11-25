'use client'
import Loading from '@/app/components/loading'
import Scaffold from '@/app/components/scaffold'
import VerificarCep from '@/app/utils/cep'
import { Service } from '@prisma/client'
import { useRouter } from 'next/navigation'
import React, { useState, useEffect, FormEvent } from 'react'

export default function Profile() {
	const [serviceData, setServiceData] = useState<any>(null)
	const [presencial, setPresencial] = useState<boolean>(true)

	const router = useRouter()

	useEffect(() => {

		
		const fetchServiceData = async () => {
			const response = await fetch(
				`/api/auth/services/${window.location.pathname.split('/')[window.location.pathname.split('/').length - 1]}`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'X-Authorization': `${sessionStorage.getItem('tk')}`
					}
				}
			)
			const { data } = await response.json()
			console.log(data)
			setServiceData(data)

		}

		fetchServiceData()
	}, [])


	if (!serviceData) {
		return <Loading />
	}


	if (serviceData) {

		return (

			<Scaffold header={<Header />}>
				<div className=" flex items-center flex-col h-full gap-20">

					<h1 className='text-2xl md:text-4xl font-bold text-slate-700'>Informações do Serviço</h1>
					<div className="w-md px-4 py-4 bg-white rounded-xl shadow-md flex flex-col justify-center items-center md:w-4/5 gap-6">

						<div className='w-full'>
							<p className='md:text-xl text-slate-700 font-bold'>Endereço</p>
						</div>
						<div className='w-full flex gap-2'>
							<div className='w-full flex flex-col gap-2'>
								<input type="number" disabled readOnly placeholder='CEP' className='px-2 w-full text-md md:text-lg p-1 rounded-lg border-slate-700 outline-none' defaultValue={serviceData?.location?.cep} />
								<input type="text" disabled readOnly placeholder='Cidade' className='px-2 w-full text-md md:text-lg p-1 rounded-lg border-slate-700 outline-none' defaultValue={serviceData?.location?.cidade} />
								<input type="text" disabled readOnly placeholder='Estado' className='px-2 w-full text-md md:text-lg p-1 rounded-lg border-slate-700 outline-none' defaultValue={serviceData?.location?.estado} />
							</div>
							<div className='w-full flex flex-col gap-2'>
								<input type="text" disabled readOnly placeholder='Rua' className='px-2 w-full text-md md:text-lg p-1 rounded-lg border-slate-700 outline-none' defaultValue={serviceData?.location?.rua} />
								<input type="number" disabled readOnly placeholder='Número' className='px-2 w-full text-md md:text-lg p-1 rounded-lg border-slate-700 outline-none' defaultValue={serviceData?.location?.numero} />
								<input type="text" disabled readOnly placeholder='Bairro' className='px-2 w-full text-md md:text-lg p-1 rounded-lg border-slate-700 outline-none' defaultValue={serviceData?.location?.bairro} />
							</div>
						</div>
						<div className='w-6/12 self-start text-center items-center px-4 gap-2 flex'>
							<input className="size-3 " disabled readOnly type="checkbox" id="presencial" checked={!serviceData?.online} />
							<label htmlFor="presencial">Presencial</label>
						</div>
						<div className='w-full'>
							<p className='md:text-xl text-slate-700 font-bold'>Informações do Serviço</p>
						</div>
						<div className='w-full flex flex-col gap-2'>
							<div className='w-full flex gap-2'>
								<input type="text" disabled readOnly defaultValue={serviceData?.category} placeholder='Categoria' className='px-2 w-full p-1 text-md md:text-lg border-slate-700 rounded-lg outline-none ' name="" />
								<input type="text" disabled readOnly defaultValue={"R$ "+serviceData?.price} placeholder='Preço' className='px-2 w-full p-1 text-md md:text-lg border-slate-700 rounded-lg outline-none ' name="" />
							</div>
							<textarea placeholder='Descrição' disabled readOnly defaultValue={serviceData?.description} className='px-2 w-full min-h-24 p-1 text-md md:text-lg border-slate-700 rounded-lg outline-none ' />
						</div>

						<div className='w-full flex justify-center'>
							<button disabled={serviceData.providerId == sessionStorage.getItem('cuid')} className='w-1/3 h-10 bg-slate-700 disabled:cursor-not-allowed text-white rounded-lg' onClick={async () => {
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
									return await response.json()
								}
								const userData = await fetchUserData()

							const response = await fetch(`/api/auth/services/${window.location.pathname.split('/')[window.location.pathname.split('/').length - 1]}/candidate`, { method: 'PUT', body: JSON.stringify({ cuid: sessionStorage.getItem('cuid'), clientName: userData.data.name }), headers: { 'X-Authorization': `${sessionStorage.getItem('tk')}` } })
								const data = await response.json()
								if (data.success) {
									alert('Candidatado com sucesso!')
								} else {
									// alert(data.message|| data.msg)
								}
								console.log(data)
							}}>Candidatar-se</button>
						</div>
					</div>
				</div>
			</Scaffold>
		)
	}
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
