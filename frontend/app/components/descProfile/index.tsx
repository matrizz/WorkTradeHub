'use client'

import { useEffect, useState } from "react"

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
                <p className="font-bold text-md md:text-xl">{String(currentUser?.name).split(' ').slice(0, 2).join(' ')}</p>
                <p className="text-xs md:text-md">{currentUser?.email}</p>
            </div>
            <div className="w-24 h-24 rounded-full p-2">
                <a href={`/profile/${sessionstorage && sessionstorage.getItem('cuid')}`}>
                    <img className="w-full h-full rounded-full" src={currentUser?.photoUrl || "https://cdn-icons-png.flaticon.com/512/11476/11476369.png"} alt="null" />
                </a>
            </div>
            <button className="font-bold" onClick={() => confirm('Deseja sair?') ? sessionstorage && sessionstorage.clear() : null}>logout</button>
        </div>
    )
}