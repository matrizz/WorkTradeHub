'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";

export default function Login() {
    
    const router = useRouter()

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();


        console.log('Submitting...');
        console.log(JSON.stringify({ email, password }))
        let headersList = {
            "Accept": "*/*",
            "Content-Type": "application/json"
        }

        let bodyContent = JSON.stringify({
            "email": email,
            "password": password
        }
        )

        let response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            body: bodyContent,
            headers: headersList
        })        

        let data = await response.text()
        console.log(data)

        if (response.status === 401){
            return alert('Credenciais inválidas')
        }
        if (response.ok){
            sessionStorage.setItem('tk', JSON.parse(data).token)
            sessionStorage.setItem('cuid', JSON.parse(data).cuid)
            return router.push('/')
        }


    };
    return (
        <div className="flex items-center text-black justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>
                <form onSubmit={handleSubmit} className="mt-4">
                    <div className="mb-4">
                        <label className="block text-gray-700">Email:</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Senha:</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200" required />
                    </div>
                    <button type="submit" className="w-full px-4 py-2 font-bold text-white bg-indigo-500 rounded hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">
                        Entrar
                    </button>
                </form>
                <div className="mt-4">
                    <Link href="/register" className="text-normal text-gray-600 hover:text-blue-700">Ainda não possui uma conta? Crie uma!</Link>

                </div>
            </div>
        </div>
    )

}
