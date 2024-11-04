'use client'
import { useRouter } from 'next/navigation';
import React from 'react';
import Chat from '../components/chat';

export function ChatPage({ room }: { room: string }) {
    
    const router = useRouter()

    if (!room) {
        return <div>Carregando...</div>
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-center">Chat</h2>
                <Chat room={room as string} />
            </div>
        </div>
    );
};

export default ChatPage;
