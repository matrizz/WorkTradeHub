export default function ListServiceItem() {
    return (
        <div className="w-full h-28 shadow-md flex justify-center items-center hover:cursor-pointer hover:scale-105 transition-all duration-300 p-3">
            <div className="w-full h-24 bg-slate-200 rounded-xl  "></div>
            <div className="w-full h-24  min-w-[75%] p-2"><p className="font-bold">List item</p>
            <p>{"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit sequi quaerat illo, assumenda commodi non optio quos minus fuga sapiente. Sed natus perferendis quibusdam aspernatur doloribus, soluta nobis distinctio quam!".slice(0, 65)+"..."}</p>
            </div>
        </div>
    )
}