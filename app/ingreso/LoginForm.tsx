"use client";

import React, { useState } from 'react';
import { loginAction } from './actions';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { UserOutlined, LockOutlined, LoadingOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import Link from 'next/link';

export default function LoginForm() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const result = await loginAction(formData);

        if (result.success) {
            router.push('/panel-personal');
            router.refresh();
            return;
        }

        setError(result.message || "Error al ingresar.");
        setLoading(false);
    }

    return (
        <div className="min-h-screen bg-[#0a192f] flex items-center justify-center p-4 relative overflow-hidden">
            <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#ea7048] opacity-10 blur-[120px] rounded-full"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#52aeb2] opacity-10 blur-[120px] rounded-full"></div>
            
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 w-full max-w-md"
            >
                <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group">
                    <ArrowLeftOutlined className="group-hover:-translate-x-1 transition-transform" />
                    <span>Volver al sitio pÃºblico</span>
                </Link>

                <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#ea7048] to-[#f59e0b] rounded-3xl shadow-lg mb-6 transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                           <LockOutlined className="text-white text-3xl" />
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Acceso Privado</h1>
                        <p className="text-gray-400 text-sm">Ingresa tus credenciales para acceder al panel de Vyktor Nexus.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                             <label className="text-xs font-bold text-[#ea7048] uppercase tracking-widest block ml-1">Usuario</label>
                             <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-[#ea7048] transition-colors">
                                    <UserOutlined />
                                </div>
                                <input 
                                    name="usuario"
                                    type="text" 
                                    required
                                    className="w-full bg-white/5 border border-white/10 text-white rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-[#ea7048]/50 focus:border-[#ea7048] transition-all"
                                    placeholder="Nombre de usuario"
                                />
                             </div>
                        </div>

                        <div className="space-y-2">
                             <label className="text-xs font-bold text-[#ea7048] uppercase tracking-widest block ml-1">ContraseÃ±a</label>
                             <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-[#ea7048] transition-colors">
                                    <LockOutlined />
                                </div>
                                <input 
                                    name="password"
                                    type="password" 
                                    required
                                    className="w-full bg-white/5 border border-white/10 text-white rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-[#ea7048]/50 focus:border-[#ea7048] transition-all"
                                    placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢"
                                />
                             </div>
                        </div>

                        {error && (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm py-3 px-4 rounded-xl text-center"
                            >
                                {error}
                            </motion.div>
                        )}

                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full bg-[#ea7048] hover:bg-[#d15d36] text-white font-bold py-4 rounded-2xl shadow-xl shadow-[#ea7048]/20 transition-all transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? <LoadingOutlined /> : 'INGRESAR'}
                        </button>
                    </form>
                </div>

                <div className="text-center mt-8 text-gray-500 text-xs">
                    &copy; 2026 VYKTOR NEXUS ARCHITECTURE & ENGINEERING
                </div>
            </motion.div>
        </div>
    );
}
