import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

interface ChatProps {
    room: string;
}

const Chat: React.FC<ChatProps> = ({ room }) => {
    const [messages, setMessages] = useState<string[]>([]);
    const [input, setInput] = useState<string>('');

    useEffect(() => {
        socket.emit('join room', room);

        socket.on('chat message', (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        return () => {
            socket.off('chat message');
            socket.emit('leave room', room);
        };
    }, [room]);

    const sendMessage = () => {
        if (input.trim()) {
            socket.emit('chat message', { room, message: input });
            setInput('');
        }
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-auto p-4 bg-gray-100">
                {messages.map((msg, index) => (
                    <div key={index} className="mb-2">
                        {msg}
                    </div>
                ))}
            </div>
            <div className="p-4 bg-white border-t">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="w-full p-2 border rounded"
                    placeholder="Digite sua mensagem"
                />
                <button
                    onClick={sendMessage}
                    className="mt-2 w-full bg-blue-500 text-white py-2 rounded"
                >
                    Enviar
                </button>
            </div>
        </div>
    );
};

export default Chat;
