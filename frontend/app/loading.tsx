'use client'
import { useEffect, useState } from 'react'

export default function Loading() {
	const [textLoading, setTextLoading] = useState('')

	useEffect(() => {
		setTimeout(() => {
			setTextLoading('carregando')
		}, 3000)
	}, [])

	return (
		<div>
			<h2>{textLoading}</h2>
		</div>
	)
}
