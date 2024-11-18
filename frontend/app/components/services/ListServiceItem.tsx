export default function ListServiceItem() { 
    return (
        <div className="w-full shadow-md flex justify-center items-center hover:cursor-pointer  transition-all duration-300">
            
            <div className="w-full px-8 py-6 ">
            <p className="font-bold">List item</p>
            <p className="text-lg max-w-1/3 hover:scale-[1.01] transition-all duration-100">
                {"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit sequi quaerat illo, assumenda commodi non optio quos minus fuga sapiente. Sed natus perferendis quibusdam aspernatur doloribus, soluta nobis distinctio quam!".slice(0, 65)+"..."}
            </p>
            </div>
        </div>
    )
}