// @ts-nocheck
'use client'
import DescProfile from './components/descProfile'
import Services from './components/services'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Modal from './components/modal/modalinformation.tsx'


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

  const inputRef = useRef<HTMLInputElement>();
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
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

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

  if (!jobs) return <Loading />

  return (
    <div className="h-full mx-auto overflow-y-scroll bg-white flex flex-col gap-10">
      <header className="md:h-28 flex justify-between items-center bg-slate-700 border-b-2 px-8 py-1">
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
      <div className="w-full text-center flex flex-col gap-3 md:gap-5">
        <div className="w-full flex flex-col gap-2">
          <h1 className="text-2xl md:text-4xl font-bold text-slate-700">
            Procurar Serviços Online
          </h1>
          <h1 className="text-2xl md:text-4xl font-bold text-slate-700">Ideal Com Rapidez e Confiança</h1>
        </div>
        <div className="w-full flex flex-col ">
          <div className="flex justify-center">
            <input
              type="text"
              ref={inputRef}
              autoFocus
              name="search"
              placeholder="Pesquise um serviço"
              value={search}              
              onChange={e => setSearch(e.target.value == '' ? (e.target.value, window.location.reload()) : e.target.value)}
              className="border text-black rounded-l-full py-2 px-4 w-1/2"
            />
            <button
              onClick={handleSearch}
              className="bg-slate-700 text-white rounded-r-full px-4">
              <i className="fas fa-search" />
            </button>
          </div>
          <div>
          </div>
        </div>
        <div className="h-full scroll-bar rounded-lg flex justify-center flex-wrap gap-4">
          {jobs.length > 0 ? (
            jobs.map((item, i) => {
              return (
                <Services
                  key={i}
                  images={item.images}
                  title={item.title}
                  description={item.description}
                  price={item.price}
                  location={item.location}
                  leftButton={{
                    text: 'Candidatar-se',
                    onclick: () => router.push(`/services/desc/${item.id}`)
                  }}
                />
              )
            })
          ) : (
            <div className="text-center text-gray-300 text-xl">
              {/* Nada por aqui! */}
            </div>
          )
          }

        </div>
      </div>
    </div>
  )
}
