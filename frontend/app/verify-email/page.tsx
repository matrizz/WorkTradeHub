'use client'

import { useState, useRef, ChangeEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import Loading from "../loading";

export default function VerifyEmail() {

    const router = useRouter()
    const inputRefs = useRef<HTMLInputElement[]>([]);
    const [isValid, setIsValid] = useState(false)
    const [validating, setValidating] = useState(true)

    useEffect(() => {

        if (!sessionStorage.getItem('cuid')) return router.push('/login');

        (async () => {

            const response = await fetch(`/api/auth/user/${sessionStorage.getItem('cuid')}`, { headers: { "X-Authorization": `${sessionStorage.getItem('tk')}` } });
            const user = await response.json()
            
            if (user.isAuth) router.push('/')
            else setValidating(false)
        })()
    }, []);

    const handleCodeLength = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value;

        // Permitir apenas um número
        if (!/^\d$/.test(value)) return;

        // Move para o próximo input se o valor for válido
        if (index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1].focus();
        }
    };

    async function handleSubmit() {
        const code = inputRefs.current.map((input) => input?.value || "").join(",").replaceAll(",", "");

        const res = await fetch(`/api/auth/account-activation?u=${sessionStorage.getItem('cuid')}`, {
            method: 'GET',
            headers: {
                'X-Code-Verification': `${code}`
            }

        })
        const response = await res.json()

        if (res.ok) {
            setIsValid(true)
            setTimeout(() => {
                router.push('/register/info')
            }, 1000)
        } else {
            alert(JSON.stringify(response.msg))
        }
    }

    if (validating) return <Loading />


    return (
        <div className="bg-slate-700 flex items-center justify-center min-h-screen">
            <div className="bg-white p-6 shadow-xl shadow-gray-700 rounded-lg w-96">
                <div className="flex items-center justify-center mb-4">
                    <i className={`fas fa-check-circle text-xl text-start ${isValid ? "text-green-500" : "text-gray-500"}`}></i>
                    <h2 className="ml-4 text-xl font-semibold text-slate-700">
                        Confirme seu e-mail
                    </h2>
                </div>
                <p className="text-gray-600 mb-6 text-justify">
                    Para garantir a segurança da sua conta, enviamos um código de verificação para o seu e-mail. Por favor, acesse a mensagem que enviamos e insira o código nos campos abaixo para concluir o processo de verificação.
                </p>
                <div className="flex justify-between text-slate-700 mb-4">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength={1}
                            ref={(el) => {
                                if (el) inputRefs.current[index] = el;
                            }}

                            onChange={(e) => handleCodeLength(e, index)}
                            className="w-12 h-12 border border-gray-300 rounded-lg text-center flex items-center justify-center text-xl font-semibold"
                        />
                    ))}
                </div>
                <div className="flex items-center justify-between text-gray-500 text-sm">
                    <span>
                        O código expira em 5 minutos
                    </span>
                </div>
                <button onClick={handleSubmit} className="w-full bg-slate-700 text-white py-2 rounded-lg mt-6">Confirmar</button>
                <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet" />
            </div>
        </div>)
}