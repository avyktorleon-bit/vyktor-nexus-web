"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
    CalculatorOutlined,
    AppstoreOutlined,
    LogoutOutlined,
    ToolOutlined,
    DashboardOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { logoutAction } from '../ingreso/actions';

export default function PanelPersonalClient() {
    const router = useRouter();

    const handleLogout = async () => {
        await logoutAction();
        router.push('/');
        router.refresh();
    };

    const widgets = [
        { title: 'Inspección Técnica', icon: <ToolOutlined />, description: 'Módulo de inspección técnica inmobiliaria y levantamiento de campo.', color: 'from-[#ea7048] to-[#f59e0b]', href: '/inspecciones' },
        { title: 'Cálculos Estructurales', icon: <CalculatorOutlined />, description: 'Herramientas de cálculo interno y verificación técnica.', color: 'from-[#52aeb2] to-[#4ade80]', href: '#' },
        { title: 'Base de Materiales', icon: <AppstoreOutlined />, description: 'Listado y costos de materiales actualizados para presupuestos.', color: 'from-purple-500 to-indigo-600', href: '#' },
        { title: 'Base de Datos Técnica', icon: <DashboardOutlined />, description: 'Repositorio de normas, manuales y documentos internos.', color: 'from-blue-500 to-cyan-400', href: '#' },
    ];

    return (
        <div className="min-h-screen bg-[#f8fafc] text-[#2f4860] font-sans">
            <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="bg-[#0a0f18] text-white p-2 rounded-xl">VN</Link>
                        <h1 className="text-xl font-bold tracking-tight">PANEL PERSONAL <span className="text-[#ea7048] font-black italic">PRO</span></h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-medium text-gray-500 hidden md:block">Bienvenido, Vyktor</span>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 bg-red-50 text-red-500 px-4 py-2 rounded-xl font-bold hover:bg-red-500 hover:text-white transition-all border border-red-100"
                        >
                            <LogoutOutlined />
                            <span>SALIR</span>
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-10 md:py-16">
                <div className="mb-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex flex-col md:flex-row md:items-end justify-between gap-6"
                    >
                        <div>
                            <span className="text-[#ea7048] font-bold tracking-widest text-xs uppercase mb-2 block">ESPACIO DE TRABAJO INTERNO</span>
                            <h2 className="text-4xl md:text-5xl font-black leading-tight text-[#0a0f18]">Herramientas de Gestión</h2>
                        </div>
                        <p className="max-w-md text-gray-500 text-sm md:text-base leading-relaxed">
                            Este es tu panel privado para realizar cálculos rápidos, consultar materiales y gestionar datos sensibles que no son públicos.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {widgets.map((widget, i) => (
                        <Link key={widget.title} href={widget.href}>
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ y: -8, scale: 1.02 }}
                                className="h-full bg-white rounded-[2.5rem] p-8 shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col items-start gap-6 cursor-pointer group"
                            >
                                <div className={`w-16 h-16 bg-gradient-to-br ${widget.color} rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg ring-8 ring-gray-50 transition-transform group-hover:scale-110`}>
                                    {widget.icon}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-[#0a0f18] mb-3">{widget.title}</h3>
                                    <p className="text-sm text-gray-500 leading-relaxed font-medium">
                                        {widget.description}
                                    </p>
                                </div>
                                <div className="mt-auto pt-6 w-full flex justify-between items-center">
                                    <span className="text-[11px] font-black text-[#ea7048] tracking-widest uppercase">ACCEDER</span>
                                    <div className="p-2 bg-gray-50 rounded-full text-gray-400 group-hover:bg-[#ea7048] group-hover:text-white transition-colors">
                                        <AppstoreOutlined />
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>

                <div className="mt-16 bg-[#0a192f] rounded-[3rem] p-10 text-white overflow-hidden relative">
                    <div
                        className="absolute inset-0 opacity-20"
                        style={{
                            backgroundImage: 'linear-gradient(#52aeb2 1px, transparent 1px), linear-gradient(90deg, #52aeb2 1px, transparent 1px)',
                            backgroundSize: '40px 40px',
                            maskImage: 'radial-gradient(circle at 100% 0%, black, transparent 80%)'
                        }}
                    >
                    </div>

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-1">
                            <h3 className="text-2xl font-bold mb-4">Métricas de Hoy</h3>
                            <p className="text-gray-400 text-sm mb-6">Resumen rápido de actividades críticas y cálculos pendientes.</p>
                            <div className="space-y-4">
                                <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex justify-between items-center">
                                    <span className="text-gray-400">Proyectos Activos</span>
                                    <span className="font-bold text-2xl">12</span>
                                </div>
                                <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex justify-between items-center">
                                    <span className="text-gray-400">Cálculos Finalizados</span>
                                    <span className="font-bold text-2xl text-[#52aeb2]">45</span>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-2">
                            <div className="h-full bg-white/5 rounded-3xl border border-white/10 p-8 flex flex-col items-center justify-center text-center">
                                <div className="w-16 h-16 bg-[#ea7048]/20 rounded-full flex items-center justify-center text-[#ea7048] text-2xl mb-6">
                                    <ToolOutlined />
                                </div>
                                <h4 className="text-xl font-bold mb-2">Sección en Construcción</h4>
                                <p className="text-gray-400 max-w-sm mb-6 text-sm">Próximamente estaremos habilitando los módulos de cálculo técnico directo en esta plataforma.</p>
                                <button className="bg-white text-[#0a192f] px-8 py-3 rounded-xl font-bold hover:bg-gray-200 transition-all">Sincronizar Datos</button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
