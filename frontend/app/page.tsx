'use client';
import DescProfile from "./components/descProfile";
import Services from "./components/services";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// ====================TEMPORARIO APENAS==========================
function Loading() {
  return <div className='w-full h-screen flex justify-center items-center'><p className='font-bold text-3xl'>Loading...</p></div>
}
// ====================TEMPORARIO APENAS==========================

interface User {
  cuid: string
  name: string
  cpf: string
  email: string
  password: string
  role: "user" | "admin"
}

export default function Page() {
  const router = useRouter()
  const [jobs, setJobs] = useState<any[]>([]);
  const [session, setSession] = useState<string|null>()
  const [isListView, setIsListView] = useState(false)
  const [currentUser, setCurrentUser] = useState<User>()
  const [search, setSearch] = useState('')


  function redirect() { return router.push('/login') }

  useEffect(() => {
    if (!sessionStorage.getItem('tk')) redirect()
    else setSession(sessionStorage.getItem('tk'))
  }, [])
  useEffect(() => {
    getJobs()
    getUserData()
  }, []);
  if (!jobs) { }

  function getJobs() {
    const response = fetch(`http://localhost:5000/api/services`);
    (async () => {
      setJobs(await response.then(res => res.json()))
    })()
  }

  function getUserData() {
    //@ts-ignore
    const response = fetch(`http://localhost:5000/api/users/${sessionStorage.getItem('cuid')}`, { headers: { "X-Authorization": sessionStorage.getItem('tk') } });
    (async () => {
      const user: User = await response.then(res => res.json())
      setCurrentUser(user)
    })()

  }

  async function handleSearch() {
    if (search !== '') {

      const formattedSearch = new URLSearchParams({ name: search }).toString()
      console.log(formattedSearch)
      //@ts-ignore
      const filteredJobs = await fetch(`http://localhost:5000/api/services/search?${formattedSearch}`, { headers: { "X-Authorization": sessionStorage.getItem('tk') } })
      setJobs(await filteredJobs.json())
    }

  }

  return (

    <div className="mx-auto bg-white flex flex-col gap-20">
      <header className="h-28 flex justify-between items-center bg-slate-700 border-b-2 px-8 py-1">
        <script src="https://unpkg.com/react/umd/react.development.js"></script>
        <script src="https://unpkg.com/react-dom/umd/react-dom.development.js"></script>
        <script src="https://unpkg.com/@babel/standalone/babel.js"></script>
        <script src="https://cdn.tailwindcss.com"></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet" />

        <h1 className="text-3xl font-bold text-white tracking-[0.05rem] italic">WorkTradeHub</h1>
        {/* @ts-ignore */}
        <DescProfile currentUser={currentUser} />
      </header>
      <main className="w-full text-center flex flex-col gap-8">
        <div className="w-full flex flex-col gap-2">
          <h1 className="text-4xl font-bold text-slate-700">Book trusted help</h1>
          <h1 className="text-4xl font-bold text-slate-700">for home tasks</h1>
        </div>
        <div className="w-full flex flex-col gap-20">
          <div className="flex justify-center">
            <input type="text" placeholder="Pesquise um serviço" value={search} onChange={e => setSearch(e.target.value)} className="border text-black rounded-l-full py-2 px-4 w-1/2" />
            <button onClick={handleSearch} className="bg-slate-700 text-white rounded-r-full px-4">
              <i className="fas fa-search" />
            </button>
          </div>

          <div className="flex justify-center flex-wrap space-x-4 gap-2">
            <button className="border rounded-full py-2 px-4 border-slate-700 text-slate-700 hover:scale-105 hover:cursor-pointer transition-all duration-300">General Furniture Assembly</button>
            <button className="border rounded-full py-2 px-4 border-slate-700 text-slate-700">IKEA Assembly</button>
            <button className="border rounded-full py-2 px-4 border-slate-700 text-slate-700">Crib Assembly</button>
            <button className="border rounded-full py-2 px-4 border-slate-700 text-slate-700">PAX Assembly</button>
            <button className="border rounded-full py-2 px-4 border-slate-700 text-slate-700">Bookshelf Assembly</button>
            <button className="border rounded-full py-2 px-4 border-slate-700 text-slate-700">Desk Assembly</button>
          </div>

        </div>
        <div className="p-4 rounded-lg flex justify-center flex-wrap gap-4">
          {
            jobs.length > 0?
              jobs.map((job, i) => {
                return <Services key={i} title={job.name} images={job.images} description={job.description} price={job.price} location={job.location} onClick={() => { }} primaryText="Conversar" secondaryText="Candidatar-se"/>
              })
              : <div className="text-center text-gray-300 text-xl">Nada por aqui!</div>
          }</div>
      </main>
    </div>
  )
}