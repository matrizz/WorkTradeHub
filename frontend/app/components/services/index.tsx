import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';


interface Service {
    id: string
    desc: string
    price: number
    category: string
    status: string
    images: string
    location: string
    providerId: string
}

const ServiceDetails = (props: Service, viewMode?: boolean) => {

    const router = useRouter();
    const { id } = useParams()

    const [service, setService] = useState<Service>(props);

    useEffect(() => {
        if (id) {
            fetch(`/api/services/${id}`)
                .then((response) => response.json())
                .then((data) => setService(data));
        }
    }, [id]);

    const startChat = () => {
        router.push(`/chat?room=${service.id}`);
    };

    // if (!service) {
    //     return <div>Carregando...</div>
    // }

    return (
        <div className={`container min-w-72 ${viewMode ? 'w-full' : 'w-min'} mx-auto px-4 py-8 rounded-lg shadow-md`}>
            <h2 className="text-xl font-bold mb-4">{service?.desc}</h2>
            <p className="text-lg mb-4">Preço: {service?.price}</p>
            <button
                onClick={startChat}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Conversar com o Empregador
            </button>
        </div>
    )
};

export default ServiceDetails