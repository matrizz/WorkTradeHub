'use client'

import { useEffect, useState } from 'react'
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';

interface DescProfileProps {
	currentUser: {
		name: string
		email: string
		photoUrl: string
	}
}

export default function DescProfile({ currentUser }: DescProfileProps) {
	const [sessionstorage, setSessionStorage] = useState<Storage>()

	useEffect(() => {
		setSessionStorage(sessionStorage)
	}, [])
	return (
		<div className="h-full flex items-center gap-2 p-1 transition-all duration-300">
			<div className="hidden sm:block">
				<p className="font-bold text-md md:text-xl">
					Olá, {String(currentUser?.name).split(' ').slice(0, 2).join(' ')}
				</p>
			</div>
			<div className="w-16 h-16 flex items-center justify-center md:w-24 md:h-24 rounded-full p-2">
				<a  className='flex flex-col items-center justify-center text-xs'
					href={`/profile/${sessionstorage && sessionstorage.getItem('cuid')}`}>
					<PersonIcon className='w-6 h-6' />
					perfil
				</a>
			</div>
			<button
				className="font-bold text-xs"
				onClick={() =>
					confirm('Deseja sair?')
						? (() => {
							sessionstorage && sessionstorage.clear()
							window.location.reload()
						})()
						: null
				}>
				<span className='flex flex-col px-1 items-center justify-center text-left'>
					<LogoutIcon className='size-6' />
					Sair
				</span>
			</button>
		</div>
	)
}
