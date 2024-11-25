interface ServiceItemProps {
	title: string
	description: string
	price: number | string
	images: string
	location: {
		cep: string
		city: string
		uf: string
		street: string
		number: number
		neighborhood: string		
	}
	leftButton: {
		text: string
		onclick: () => void
	}
	rightButton?: {
		text: string
		onclick: () => void
		
	}
	centerButton?: {
		text: string
		onclick: () => void
	}
	imageClick?: () => void
}

export default function Services({
	title,
	description,
	price,
	images,
	location,
	imageClick,
	leftButton,
	rightButton,
	centerButton
}: ServiceItemProps) {
	return (
		<>
			<div className="w-80 text-black flex flex-col shadow-gray-300 shadow-lg gap-2 p-2 hover:scale-[1.02] transition-all duration-300">
				<div className="w-full flex flex-col gap-2">
					<div className="w-full h-42 max-h-42 items-center justify-center border-2 flex shadow-md">
						<img
							onClick={imageClick}
							src={images}
							className="hover:cursor-pointer w-min h-40 object-cover"
							alt="service image"
						/>
					</div>
					<div className="w-full flex flex-col text-start px-2 gap-3">
						<p className="font-bold text-lg">{title}</p>
						<div className="w-full flex flex-col justify-between items-end">
							<div className="text-sm text-gray-400">
								<p>{description}</p>
								<i className="fas fas-icon-location"></i>
								<p className="text-gray-400 font-bold">
									{location?.city? location.city : ''} - {location?.uf? location.uf : ''}
								</p>
							</div>
							<p>R$ {price}</p>
						</div>
					</div>
				</div>
				<div className="w-full flex justify-between gap-4">
					<button onClick={leftButton.onclick} className="w-full h-10 bg-slate-800 text-white px-2 hover:scale-[1.02] rounded-sm transition-all duration-300">
						{leftButton.text}
					</button>
					{rightButton?.text && <button onClick={rightButton.onclick} className="w-full h-10 bg-slate-800 text-white px-2 hover:scale-[1.02] rounded-sm transition-all duration-300">
						{rightButton.text}
					</button>}
					{centerButton?.text && <button onClick={centerButton.onclick} className="w-full h-10 bg-slate-800 text-white px-2 hover:scale-[1.02] rounded-sm transition-all duration-300">
						{centerButton.text}
					</button>}
				</div>
			</div>
		</>
	)
}
