'use client'
import { useRouter } from "next/navigation";
import { useState, FormEvent, useEffect } from "react";

export default function Login() {

    const router = useRouter()
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [passwordConfirm, setPasswordConfirm] = useState<string>('');
    const [ERR, SET_ERR] = useState<{ msg: string } | undefined>();
    const [ERR_CONFIRM_PASS, SET_ERR_CONFIRM_PASS] = useState<boolean>(false)


    const [MESSAGES] = useState({
        DIFF: 'As senhas devem ser iguais',
        EMPTY: 'Preencha todos os campos',
        INVALID: 'Credenciais inválidas',
        SERVER: 'Erro no servidor',
        SUCCESS: 'Registrado com sucesso',
        EXIST: 'Email ja existe',
        MIN: 'Senha deve ter entre 8 e 20 caracteres'
    })
    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()

        console.log('Submitting...')
        console.log(name, email, password)
        let headersList = {
            "Accept": "*/*",
            "Content-Type": "application/json"
        }

        let bodyContent = JSON.stringify({
            "name": name,
            "email": email,
            "password": password,
            "role": "user"
        }
        );

        let response = await fetch("http://localhost:5000/api/auth/register", {
            method: "POST",
            body: bodyContent,
            headers: headersList
        });

        let data = await response.text();
        sessionStorage.setItem('tk', JSON.parse(data).token)
        sessionStorage.setItem('cuid', JSON.parse(data).cuid)
        router.push('/')
    };

    useEffect(() => {
        if (password != '' && password.length < 8 || password.length > 20) {
            SET_ERR({ msg: MESSAGES['MIN'] })
            console.log(ERR_CONFIRM_PASS, ERR)
        } else SET_ERR(undefined)

        if (passwordConfirm !== '' && passwordConfirm !== password) {
            SET_ERR_CONFIRM_PASS(true)
            SET_ERR({ msg: MESSAGES['DIFF'] })
            console.log(ERR_CONFIRM_PASS, ERR)
        } else SET_ERR_CONFIRM_PASS(false)

    }, [password, passwordConfirm])

    return (
        <div className="flex items-center text-black justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-700">Registrar</h2>
                <form onSubmit={handleSubmit} className="mt-4">
                    <div className="mb-4">
                        <label className="block text-gray-700">Nome:</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email:</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Senha:</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Confirmar senha:</label>
                        <input type="password" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} className={`${ERR_CONFIRM_PASS ? 'text-red-500 ring-2 ring-red-500' : ''} w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200`} required />
                    </div>
                    <div className={`${ERR ? 'visible' : 'hidden'} flex p-2 items-center text-black justify-center`}>
                        <div className="w-full">
                            <p className="text-red-500 text-center">{
                                ERR ? ERR.msg : ''
                            }</p>
                        </div>
                    </div>
                    <button type="submit" className="w-full px-4 py-2 font-bold text-white bg-indigo-500 rounded hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    )

}