

export default function Loading() {

    return (
        <div className="w-full h-screen gap-2 bg-slate-50 text-black font-bold flex justify-center items-center">
            <p className="text-xl">Carregando</p>
            <div className="flex gap-1 loaders">
                <div className="loader loader-1" />
                <div className="loader loader-2" />
                <div className="loader loader-3" />
            </div>
        </div>
    )
}