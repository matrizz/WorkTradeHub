import React, { ReactNode } from 'react'

interface ScaffoldProps {
	children?: ReactNode | ReactNode[]
	header?: ReactNode | ReactNode[]
	styles?: {
		main?: string
		header?: string
	}
}

export default function Scaffold({
	children,
	header,
	styles
}: ScaffoldProps) {
	return (
		<>
			<header
				className={`bg-slate-800 h-[12%] w-full px-2 py-3 ${styles?.header}`}>
				{header}
			</header>
			<main
				className={`bg-white h-[88%] text-black w-full p-10 flex flex-col ${styles?.main}`}>
				{children}
			</main>
		</>
	)
}
