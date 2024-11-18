'use client'
import { useRouter } from "next/navigation";
import { useState, FormEvent  } from "react";

export default function Login() {

    const router = useRouter()
    const [city, setCity] = useState<string>('');
    const [cep, setCEP] = useState<string>('');
    const [social, setSocial] = useState<string>('');
    const [siteLink, setSiteLink] = useState<string>('');
    const [state, setState] = useState<string>('');

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()

        console.log('Submitting...')
        let headersList = {
            "Content-Type": "application/json",
            "X-Authorization": `${sessionStorage.getItem('tk')}`
        }

        let bodyContent = JSON.stringify({
            "uf": state,
            "city": city,
            "cep": cep,
            "social": social,
            "site": siteLink
        });

        let response = await fetch(`/api/auth/user/${sessionStorage.getItem('cuid')}`, {
            method: "PUT",
            body: bodyContent,
            headers: headersList
        });

        if (!response.ok) {
            return alert('Erro no servidor')
        }
        let data = await response.text();

        router.push('/')
    };


    return (
        <div className="flex items-center text-black justify-center min-h-screen bg-gray-100">
            <div className=" p-8 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-700">Preencha seus dados</h2>
                <form onSubmit={handleSubmit} className="mt-4 flex flex-col">
                    <div className="flex flex-col md:flex-row gap-2">

                        <div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Cidade:</label>
                                <input type="text" value={city} onChange={(e) => setCity(e.target.value)} className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200" required />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Estado:</label>
                                <input type="text" value={state} onChange={(e) => setState(e.target.value)} className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200" required />
                            </div>
                        </div>

                        <div>
                            <div className="mb-4">
                                <label className="block text-gray-700">CEP:</label>
                                <input type="number" value={cep} onChange={(e) => setCEP(e.target.value)} className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200" required />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Link de uma rede social: <span className="text-xs text-gray-400">(opcional)</span> </label>
                                <input type="text" value={social} onChange={(e) => setSocial(e.target.value)} className={`w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200`} />
                            </div>

                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Link do seu site: <span className="text-xs text-gray-400">(opcional)</span></label>
                        <input type="password" value={siteLink} onChange={(e) => setSiteLink(e.target.value)} className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"  />
                    </div>
                    <div className={`flex p-2 items-center text-black justify-center`}>
                        <div className="w-full">
                            <p className="text-red-500 text-center">{

                            }</p>
                        </div>
                    </div>
                    <button type="submit" className="w-full px-4 py-2 font-bold text-white bg-indigo-500 rounded hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">
                        Concluir
                    </button>
                </form>
            </div>
        </div>
    )

}
