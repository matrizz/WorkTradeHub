'use client'
import Scaffold from '@/app/components/scaffold';
import React, { useState, useEffect, FormEvent } from 'react';

export default function Profile() {
    const [userData, setUserData] = useState<any>(null);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [formData, setFormData] = useState<any>({
        name: '',
        email: '',
        bio: '',
        avatar_url: ''
    });

    useEffect(() => {
        const fetchUserData = async () => {
            const response = await fetch(`/api/auth/user/${sessionStorage.getItem('cuid')}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': `${sessionStorage.getItem('tk')}`
                }
            });
            const data = await response.json();
            setUserData(data);
            setFormData({
                name: data.name,
                email: data.email,
                avatar_url: data.avatar_url
            });
        };

        fetchUserData();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const response = await fetch(`/api/auth/user/${sessionStorage.getItem('cuid')}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Authentication': `${sessionStorage.getItem('tk')}`
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            const data = await response.json();
            setUserData(data);
            setEditMode(false);
        } else {
            console.error('Erro ao atualizar perfil');
        }
    };

    if (!userData) {
        return <div>Carregando...</div>;
    }

    return (
        <Scaffold header={<Header /> }>
            <div className="flex items-center justify-center h-full py-56 bg-gray-100">
                <div className="w-full max-w-md px-4 py-4 bg-white rounded-xl shadow-md flex flex-col justify-center items-center gap-2">
                    {editMode ? (
                        <form onSubmit={handleSubmit}>
                            <div className="flex items-center space-x-4">
                                <img
                                    src={formData.avatar_url || 'https://via.placeholder.com/150'}
                                    alt="Profile"
                                    className="w-24 h-24 "
                                />
                                <div>
                                    <label className="block text-gray-700">Nome:</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full mt-1 p-2 border rounded-md text-black"
                                    />
                                </div>
                            </div>
                            <div className="mt-4">
                                <label className="block text-gray-700">Descrição:</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full mt-1 p-2 border rounded-md text-black"
                                />
                            </div>
                            <div className="mt-4">
                                <label className="block text-gray-700">Valor:</label>
                                <input
                                    type="text"
                                    name="avatar_url"

                                    onChange={handleChange}
                                    className="w-full mt-1 p-2 border rounded-md text-black"
                                />
                            </div>
                            <div className="mt-4 flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={() => setEditMode(false)}
                                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 "
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    Salvar
                                </button>
                            </div>
                        </form>
                    ) : (
                        <>
                            <div className="w-full flex items-center justify-center ">
                                <img
                                    src={userData.avatar_url || 'https://via.placeholder.com/400'}
                                    alt="Profile"
                                    className="w-full h-42"
                                />
                                <div>
                                    <h2 className="text-2xl font-bold">{userData.name}</h2>
                                    <p className="text-gray-600">{userData.email}</p>
                                </div>
                            </div>
                            <div className="mt-4 w-full flex flex-col gap-2">
                                <h3 className="text-xl text-black">Nome do Serviço</h3>
                                <p className="text-gray-700">Descrição do Serviço</p>
                                <div className='w-full flex justify-end'>
                                    <p className="text-gray-700 font-bold">valor</p>
                                </div>
                            </div>
                            <div className="w-full mt-4 flex justify-end">
                                <button
                                    onClick={() => setEditMode(true)}
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    Editar Serviço
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </Scaffold>
    );
}

const Header = () => {
    return (
        <div className='w-full h-full flex items-center justify-between px-6 py-1'>
            <p className='text-lg font-bold hover:-translate-x-3 transition-all duration-300'>Back Icon</p>
        </div>
    )
}