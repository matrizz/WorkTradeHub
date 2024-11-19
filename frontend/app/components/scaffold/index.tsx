import React, { ReactNode } from 'react'

interface ScaffoldProps {
	children?: ReactNode | ReactNode[]
	header?: ReactNode | ReactNode[]
	footer?: ReactNode | ReactNode[]
	styles?: {
		main?: string
		header?: string
		footer?: string
	}
}

export default function Scaffold({
	children,
	header,
	footer,
	styles
}: ScaffoldProps) {
	return (
		<>
			<header
				className={`bg-slate-800 h-36 w-full px-2 py-3 ${styles?.header}`}>
				{header}
			</header>
			<main
				className={`bg-white text-black w-full p-10 flex flex-col  ${styles?.main}`}>
				{children}
			</main>
			<footer
				className={`bg-slate-800 h-32 w-full ${footer ? 'visible' : 'hidden'} ${styles?.footer}`}>
				{footer}
			</footer>
		</>
	)
}
