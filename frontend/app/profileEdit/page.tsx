import Scaffold from "../components/scaffold";

export default function ProfileEdit() {
    return (
        <Scaffold header={<Header />}>
            <div className=" flex items-center flex-col h-full gap-20">

                <h1 className='text-2xl md:text-4xl font-bold text-slate-700'>Editar Informações Pessoais</h1>
                <div className="w-md px-4 py-4 bg-white rounded-xl shadow-md flex flex-col justify-center items-center md:w-4/6 gap-6">

                    <div className='w-full flex justify-center'>
                        <img className="h-60" src="https://cdn-icons-png.flaticon.com/512/11476/11476369.png" alt="avatar" />
                    </div>
                    <div className='w-full flex gap-2'>
                        <div className='w-full flex flex-col gap-2'>
                            <input type="text" placeholder='Nome' className='border w-full text-md md:text-lg p-1 rounded-lg border-slate-700 outline-none' />
                            <input type="text" placeholder='Rua' className='border w-full text-md md:text-lg p-1 rounded-lg border-slate-700 outline-none'/>
                            <input type="text" placeholder='Bairro' className='border w-full text-md md:text-lg p-1 rounded-lg border-slate-700 outline-none'/>
                            <input type="text" placeholder='Telefone' className='border w-full text-md md:text-lg p-1 rounded-lg border-slate-700 outline-none'/>

                        </div>
                        <div className='w-full flex flex-col gap-2'>
                            <input type="text" placeholder='CEP' className='border w-full text-md md:text-lg p-1 rounded-lg border-slate-700 outline-none'/>
                            <input type="text" placeholder='Cidade' className='border w-full text-md md:text-lg p-1 rounded-lg border-slate-700 outline-none'/>
                            <input type="text" placeholder='E-mail' className='border w-full text-md md:text-lg p-1 rounded-lg border-slate-700 outline-none'/>
                            <input type="number" placeholder='Senha' className='border w-full text-md md:text-lg p-1 rounded-lg border-slate-700 outline-none'/>

                        </div>
                    </div>

                    <div className='w-full flex justify-center'>
                        <button className='w-1/3 h-10 bg-slate-700 text-white rounded-lg'>Confirmar</button>
                    </div>
                </div>
            </div>
        </Scaffold>
    )

}

const Header = () => {
    return (
        <div className="w-full h-full flex items-center justify-between px-6 py-1">
            <p className="text-lg font-bold hover:-translate-x-3 hover:cursor-pointer transition-all duration-300">
                WorkTradeHub
            </p>
        </div>
    )
}
