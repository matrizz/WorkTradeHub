'use client'
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function VerifyEmail() {

    const router = useRouter()
    const [code, setCode] = useState<string>('')
    function handleCodeLength(value: string) {

        if (value.length > 6) {
            return setCode(value.slice(0, 6))
        } 
        setCode(value)

    }
    async function handleSubmit() {
        const cuid = sessionStorage.getItem('cuid')
        
        if (!cuid) {
            return alert('ID não especificado')
        }
        const res = await fetch(`http://localhost:5000/api/auth/account-activation?cuid=${cuid}`, {
            method: 'GET',
            headers: {
                'X-Code-Verification': code
            }

        })
        if (res.ok) {
            const response = await res.json()
            router.push('/')
        }
    }

    return (
        <div className="flex flex-col ">
            <div>Verifique seu e-mail</div>
            <p>Digite o código de verificação enviado para o seu e-mail </p>
            <div className="border bg-white rounded max-w-60">
                <label className="text-gray-600 font-semibold pl-2 pr-1 border-r-2" htmlFor="code">C -</label>
                <input maxLength={6} className="outline-none max-w-48 text-gray-500 px-2" onChange={(e) => handleCodeLength(e.target.value)} type="text" id="code" name="code" value={code} />
            </div>
            <button onClick={handleSubmit}>Confirmar código</button>
        </div>

    )
}