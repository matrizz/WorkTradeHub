// @ts-nocheck
'use client'
import DescProfile from './components/descProfile'
import Services from './components/services'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Modal from './components/modal/modalInformation'
import ModalCreate from './components/modal/modalCreate'

// ====================TEMPORARIO APENAS==========================
function Loading() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <p className="font-bold text-3xl">Loading...</p>
    </div>
  )
}
// ====================TEMPORARIO APENAS==========================

interface User {
  cuid: string
  name: string
  cpf: string
  email: string
  password: string
  role: 'user' | 'admin'
}

export default function Page() {



  const router = useRouter()
  const [jobs, setJobs] = useState<any[]>([])
  const [session, setSession] = useState<string | null>()
  const [isListView, setIsListView] = useState(false)
  const [currentUser, setCurrentUser] = useState<User>()
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)

  function redirect() {
    return router.push('/login')
  }

  useEffect(() => {
    if (!sessionStorage.getItem('tk')) redirect()
    else if (!sessionStorage.getItem('cuid')) redirect()
    else setSession(sessionStorage.getItem('tk'))
    setIsLoading(false)
  }, [])

  useEffect(() => {
    getJobs()
    getUserData()
  }, [])

  async function getJobs() {
    const response = await fetch(`/api/auth/services`, { headers: { 'X-Authorization': `${sessionStorage.getItem('tk')}` } })
    const { data } = await response.json()
    console.log(data)
    if (response.status === 404 || response.status === 401) {
      return redirect()
    }
    setJobs(data)
  }

  async function getUserData() {
    //@ts-ignore
    const response = await fetch(`/api/auth/user/${sessionStorage.getItem('cuid')}`, { headers: { 'X-Authorization': `${sessionStorage.getItem('tk')}` } })

    if (response.status === 404 || response.status === 401) {
      return redirect()
    }
    const user: User = await response.json()
    console.log(user)
    setCurrentUser(user.data)
  }

  async function handleSearch() {
    if (search !== '') {
      const formattedSearch = new URLSearchParams({ search: search.toLowerCase() }).toString()
      console.log(formattedSearch)
      //@ts-ignore
      const filteredJobs = await fetch(`/api/auth/services?${formattedSearch}`, { headers: { 'X-Authorization': sessionStorage.getItem('tk') } })
      const { data } = await filteredJobs.json()
      setJobs(data)
    }
  }

  return (
    <div className="mx-auto bg-white flex flex-col gap-20">
      <ModalCreate isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <header className="h-28 flex justify-between items-center bg-slate-700 border-b-2 px-8 py-1">
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
          rel="stylesheet"
        />

        <h1 className="text-xl md:text-2xl font-bold text-white tracking-[0.05rem] italic">
          WorkTradeHub
        </h1>

        {/* @ts-ignore */}
        <DescProfile currentUser={currentUser} />
      </header>
      <div className="w-full text-center flex flex-col gap-8">
        <div className="w-full flex flex-col gap-2">
          <h1 className="text-4xl font-bold text-slate-700">
            Book trusted help
          </h1>
          <h1 className="text-4xl font-bold text-slate-700">for home tasks</h1>
        </div>
        <div className="w-full flex flex-col gap-20">
          <div className="flex justify-center">
            <input
              type="text"
              placeholder="Pesquise um serviço"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="border text-black rounded-l-full py-2 px-4 w-1/2"
            />
            <button
              onClick={handleSearch}
              className="bg-slate-700 text-white rounded-r-full px-4">
              <i className="fas fa-search" />
            </button>
          </div>

          <div className="flex justify-center flex-wrap space-x-4 gap-2">
            <button className="border rounded-full py-2 px-4 border-slate-700 text-slate-700 hover:scale-105 hover:cursor-pointer transition-all duration-300">
              General Furniture Assembly
            </button>
            <button className="border rounded-full py-2 px-4 border-slate-700 text-slate-700 hover:scale-105 hover:cursor-pointer transition-all duration-300">
              IKEA Assembly
            </button>
            <button className="border rounded-full py-2 px-4 border-slate-700 text-slate-700 hover:scale-105 hover:cursor-pointer transition-all duration-300">
              Crib Assembly
            </button>
            <button className="border rounded-full py-2 px-4 border-slate-700 text-slate-700 hover:scale-105 hover:cursor-pointer transition-all duration-300">
              PAX Assembly
            </button>
            <button className="border rounded-full py-2 px-4 border-slate-700 text-slate-700 hover:scale-105 hover:cursor-pointer transition-all duration-300">
              Bookshelf Assembly
            </button>
            <button className="border rounded-full py-2 px-4 border-slate-700 text-slate-700 hover:scale-105 hover:cursor-pointer transition-all duration-300">
              Desk Assembly
            </button>
          </div>
        </div>
        <div className="p-4 rounded-lg flex justify-center flex-wrap gap-4">
          {jobs.length > 0 ? (
            jobs.map((job, i) => {
              return (
                <Services
                  key={i}
                  title={job.name}
                  images={job.images}
                  isModalOpen={isModalOpen}
                  description={job.description}
                  price={job.price}
                  location={job.location}
                  onClick={() => {
                    setIsModalOpen(true)
                  }}
                  onClose={() => {
                    setIsModalOpen(false)
                  }}
                  primaryText="Conversar"
                  secondaryText="Candidatar-se"
                />
              )
            })
          ) : (
            <div className="text-center text-gray-300 text-xl">
              Nada por aqui!
            </div>
          )}
          {/* <Services
            title="Teste"
            description="descrição teste"
            location="Brazil"
            primaryText="Conversar"
            secondaryText="Candidatar-se"
            images="https://avatars.githubusercontent.com/u/95687945?v=4"
            price={"R$100,00"}
            onClick={() => setIsModalOpen(true)} /> */}
        </div>
      </div>
    </div>
  )
}
