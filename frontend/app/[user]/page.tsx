'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect, Suspense } from 'react'
import Services from '../components/services'
import { KeyboardBackspace } from '@mui/icons-material'
import { extractUserNameFromURL } from '../utils/user'

interface User {
	cuid: string
	name: string
	cpf: string
	email: string
	social: string
	site_link: string
	location: {
		cep: string
		city: string
		uf: string
	}
	password: string
	avatar_url: string
	role: 'user' | 'admin'
}

export default function ThirdUserPage() {
	const [jobs, setJobs] = useState<any[]>([])
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [currentUser, setCurrentUser] = useState<{ data: User }>()
	const [not_found, serNotFound] = useState(false)

	async function getUserServices(user: string, auth: string) {
		
	}

	useEffect(() => {
		const user = extractUserNameFromURL(window.location.pathname)
			; (async () => {
				const responseData = await fetch(`/api/auth/user/u/${user}`)
				const res = await responseData.json()
				if (!res.data) {
					return serNotFound(true)
				}
				const response = await fetch(`/api/auth/user/services?u=${user}`, {
					headers: { 'X-Authorization': `${sessionStorage.getItem('tk')}` }
				})
				const { data } = await response.json()
				console.log(data)
				setJobs(data)
			})()
	}, [])
	const route = useRouter()

	if (not_found) {
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

						<button className="text-xl font-bold hover:-translate-x-3 transition-all duration-300 flex gap-2 justify-center items-center">
							<KeyboardBackspace className="w-6 h-6" />
						</button>
						<h1 className="text-3xl font-bold text-white tracking-[0.05rem] italic">
							WorkTradeHub
						</h1>
					</header>
					<div className="flex flex-col text-slate-700 items-center p-8 bg-white min-h-max">
						<div className="flex flex-col items-center">
							<img
								src={
									currentUser?.data?.avatar_url ||
									'https://cdn-icons-png.flaticon.com/512/11476/11476369.png'
								}
								alt={`Profile picture`}
								className="opacity-20 rounded-full w-24 h-24"
							/>

							<p className="text-2xl text-slate-700/50 mt-4">
								Usuário não encontrado!
							</p>
							<div className="flex items-center mt-2 text-gray-500"></div>
						</div>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div>
			<Suspense fallback={<p className="font-bold text-3xl">Loading..</p>}>
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

						<button className="text-xl font-bold hover:-translate-x-3 transition-all duration-300 flex gap-2 justify-center items-center">
							<KeyboardBackspace className="w-6 h-6" />
						</button>
						<h1 className="text-3xl font-bold text-white tracking-[0.05rem] italic">
							WorkTradeHub
						</h1>
					</header>
					<div className="flex flex-col text-slate-700 items-center p-8 bg-white min-h-max">
						<div className="flex flex-col items-center">
							<img
								src={
									currentUser?.data?.avatar_url ||
									'https://cdn-icons-png.flaticon.com/512/11476/11476369.png'
								}
								alt={`Profile picture of ${currentUser?.data.name}`}
								className="rounded-full w-24 h-24"
							/>
							<h1 className="text-2xl font-bold mt-4">
								{currentUser?.data?.name}
							</h1>
							<p className="text-gray-600">{currentUser?.data?.email}</p>
							<div className="flex items-center mt-2 text-gray-500">
								<i className="fas fa-map-marker-alt mr-2"></i>
								<span>
									Brasil, {currentUser?.data?.location?.city} -{' '}
									{currentUser?.data?.location?.uf}
								</span>

								{currentUser?.data?.social && (
									<>
										<i className="fas fa-globe ml-4 mr-2"></i>
										<a href={currentUser?.data?.social.includes('http') ? currentUser?.data?.social : `http://${currentUser?.data?.social}`} target='_blank'>{currentUser?.data?.social}</a>
									</>
								)}

								{currentUser?.data?.site_link && (
									<>
										<i className="fas fa-link ml-4 mr-2"></i>
										<a href={currentUser?.data?.site_link.includes('http') ? currentUser?.data?.site_link : `http://${currentUser?.data?.site_link}`} target='_blank' >{currentUser?.data?.site_link}</a>
									</>
								)}
							</div>
						</div>
						<div className="flex mt-8 w-full max-w-4xl justify-between">
							<div className="flex space-x-8">
								<p className="text-blue-600 border-b-2 border-blue-600 pb-2">
									Trabalhos Criados
								</p>
							</div>
						</div>
					</div>
				</div>

				<div className="p-4 rounded-lg flex justify-center flex-wrap gap-4">
					{jobs &&jobs.map((item, i) => (
						<Services
							key={i}
							description={item.desc}
							price={item.price}
							images={item.image}
							location={item.location}
							title='Teste'
							leftButton={{
								text: 'Candidatar-se',
								async onclick() {
									const response = await fetch(`/api/auth/services/${item.id}/candidate`, { method: 'POST', headers: { 'X-Authorization': `${sessionStorage.getItem('tk')}` } })
									const data = await response.json()
									console.log(data)
								}
							}}
						/>
					))}
				</div>
			</Suspense>
		</div>
	)
}
