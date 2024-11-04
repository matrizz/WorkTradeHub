// app/page.tsx
//@ts-nocheck
'use client'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Scaffold from './components/scaffold';
import Card from './components/services';
import Filter from './components/filter';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

// ====================TEMPORARIO APENAS==========================
function Loading() {
  return <div className='w-full h-screen flex justify-center items-center'><p className='font-bold text-3xl'>Loading...</p></div>
}
// ====================TEMPORARIO APENAS==========================



export default function Home() {

  const router = useRouter()
  const [jobs, setJobs] = useState();
  const [session, setSession] = useState(sessionStorage.getItem('tk'))
  const [isListView, setIsListView] = useState(false)
  const [currentUser, setCurrentUser] = useState()


  function redirect() { return router.push('/login') }

  useEffect(() => {
    if (!session) redirect()
    else setSession(sessionStorage.getItem('tk'))
  }, [])
  useEffect((getJobs, getUserData), []);
  if (!jobs) { }

  function getJobs() {
    const response = fetch(`http://localhost:5000/api/services`);
    (async () => {
      setJobs(await response.then(res => res.json()))
    })()
  }

  function getUserData() {
    const response = fetch(`http://localhost:5000/api/users/${sessionStorage.getItem('cuid')}`, { headers: { "Authorization": session } });
    (async () => {
      const user = await response.then(res => res.json())
      setCurrentUser(user)
    })()

  }

  return (
    <Scaffold
      header={<Header currentUser={currentUser} />}
      footer={<Footer />}
      styles={{
        header: 'bg-slate-800 h-36 w-full px-2 py-3',
        main: 'bg-white text-black w-full p-10 flex flex-col gap-10',
        footer: 'bg-slate-800 h-32 w-full'
      }}>
      <div className='w-full flex flex-col justify-center items-center gap-10 px-20'>
        <input className='w-96 h-10 shadow-lg shadow-gray-200 text-xl outline-none px-4 rounded-xl border border-gray-300' type="text" />
        <div className='w-full flex justify-between px-4 items-center bg-slate-50 rounded-md'>

          <div className='h-20 w-full items-center flex gap-3'>
            <Filter text={'Filtrar'} onClick={() => { }} />
            <Filter text={'Filtrar'} onClick={() => { }} />
          </div>
          <div>
            <div className='w-full h-20 flex justify-center items-center gap-5 bg-slate-50'>
              <button className='text-2xl shadow-md size-10 rounded-md bg-slate-50 font-thin' disabled={isListView} onClick={() => setIsListView(true)}>=</button>
              <button className='text-xl shadow-md size-10 rounded-md bg-slate-50 font-bold' disabled={!isListView} onClick={() => setIsListView(false)} >:::</button>
            </div>
          </div>
        </div>
      </div>

      <div className={`w-full flex ${isListView ? 'flex-col' : 'flex-wrap'} transition-all justify-center gap-2`}>
        {Array.from({ length: 50 }).map((card, i) => (
          <Card viewMode={isListView} key={i} title="Card Title" desc="This is a description of the card. It can contain details about the content of the card." imageUrl="https://via.placeholder.com/150" price={'R$100,00'} />
        ))}
      </div>
    </Scaffold>
  );
}
const Header = ({ currentUser }) => {
  return (
    <div className='w-full h-full flex items-center justify-between px-6 py-1'>
      <button className='text-xl font-bold hover:-translate-x-3 transition-all duration-300 flex gap-2 justify-center items-center'><KeyboardBackspaceIcon className='w-20 h-20' /><p className='justify-center items-center text-lg'>Home</p></button>
      <div className='h-ful rounded-lg px-4 flex justify-center items-center gap-2 hover:scale-105 transition-all duration-300'>
        <div className='text-right flex flex-col gap-1'>
          {/* <p className='font-bold text-lg'>{currentUser?.name.split(' ').slice(0, 2).join(' ')}</p> */}
        </div>
        <div className='border-2 border-white w-20 h-20 rounded-full'></div>
      </div>
    </div>
  )
}
const Footer = () => {
  return (
    <div></div>
  )
}
