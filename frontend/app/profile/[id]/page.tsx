import Scaffold from "@/app/components/scaffold";
import Input from "@/app/components/services/InputService";
import { KeyboardBackspace } from "@mui/icons-material";

interface Params {
    id: string;
    tk: string;
}

export default async function Profile({ params }: { params: Promise<Params> }) {
    const { id, tk } = await params
    const response = fetch(`http://localhost:5000/api/users/${id}`, { headers: { 'Authorization': tk } });

    const user = (async () => {
        const user = await response.then(console.log)
        console.log(user)
        return user
    })()

    return (

    <Scaffold
            header={
                <div className='w-full h-full flex items-center justify-between px-6 py-1'>
                    <button className='text-xl font-bold hover:-translate-x-3 transition-all duration-300 flex gap-2 justify-center items-center'><KeyboardBackspace className='w-6 h-6' /><p className='justify-center items-center text-lg'>Home</p></button>
                    <div className='h-ful rounded-lg px-4 flex justify-center items-center gap-2 hover:scale-105 transition-all duration-300'>
                        <div className='text-right flex flex-col gap-1'>
                            {/* <p className='font-bold text-lg'>{currentUser?.name.split(' ').slice(0, 2).join(' ')}</p> */}
                        </div>
                    </div>
                </div>
            }
            styles={{
                header: 'bg-slate-800 h-36 w-full px-2 py-3',
                main: 'bg-white text-black w-full py-10 px-0 flex flex-col gap-8',
                footer: 'bg-slate-800 h-32 w-full'
            
            }}>
     
            
        <div className="flex justify-center items-center w-full h-full">
            <div className='border-4 border-slate-800 w-56 h-56 rounded-full justify-center items-center'></div>
        </div>

            <div className="justify-center items-center flex h-full w-full flex-col gap-12">
                <div className="flex justify-center items-center w-full h-10 p-3">
                    <Input placeholder='nome:' />
                </div>

                <div className="flex justify-center items-center w-full h-10 p-3">
                    <Input placeholder='idade:' />
                </div>

                <div className="flex justify-center items-center w-full h-10 p-3">
                    <Input placeholder='Telefone:' />
                </div>

                <div className="flex justify-center items-center w-full h-10 p-3">
                    <Input placeholder='Habilidades:' isTextArea={true} />
                </div>

                <div className="flex justify-center items-center w-full h-10 p-3">
                    <Input placeholder='Trabalhos criados:' />
                </div>
                </div>

    </Scaffold>
    


        // <div>
        //     <div>Perfil do Usuário ID: {id}</div>
        //     <div>Nome: {user.name}</div>
        //     <div>Email: {user.email}</div>
        //     <div>Role: {user.role}</div>
        // </div>

               

    );
}
