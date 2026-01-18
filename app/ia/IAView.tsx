"use client";

import React from 'react';
import Link from 'next/link';
import {
    Palette,
    Settings,
    ClipboardList,
    ArrowRight,
    Zap,
    Cpu,
    Box,
    Layout,
    Building2,
    HardHat
} from 'lucide-react';
import { motion } from 'framer-motion';

const profiles = [
    {
        id: 'architects',
        title: 'Arquitectos',
        description: 'IA para diseño, concepto, planos y presentación arquitectónica.',
        focus: 'Creatividad, apoyo al diseño, visualización y etapas tempranas del proyecto.',
        href: '/tutoriales-ia-arquitectos',
        icon: <Palette className="w-8 h-8" />,
        color: 'from-[#52aeb2] to-[#45969a]',
        badge: 'CREATIVIDAD'
    },
    {
        id: 'engineering',
        title: 'Ingeniería',
        description: 'IA aplicada a análisis, cálculo, coordinación y documentación técnica.',
        focus: 'Soporte técnico, interpretación, productividad, revisión y apoyo profesional.',
        href: '/tutoriales-ia-ingenieros',
        icon: <Settings className="w-8 h-8" />,
        color: 'from-[#2f4860] to-[#1e2e3e]',
        badge: 'PRODUCTIVIDAD'
    },
    {
        id: 'construction',
        title: 'Construcción / Proyectos',
        description: 'IA para gestión, obra, control, planificación y comunicación.',
        focus: 'Gestión de proyectos, seguimiento, documentación y apoyo en obra.',
        href: '/tutoriales-ia-construccion',
        icon: <HardHat className="w-8 h-8" />,
        color: 'from-[#ea7048] to-[#d15d36]',
        badge: 'GESTIÓN'
    }
];

export default function IAView() {
    return (
        <div className="min-h-screen bg-[#dde8f4] font-sans text-[#2f4860]">

            {/* 1) HERO SECTION */}
            <section className="relative bg-[#2f4860] text-white overflow-hidden py-24 px-4">
                <div className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: 'linear-gradient(#52aeb2 1px, transparent 1px), linear-gradient(90deg, #52aeb2 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

                <div className="container mx-auto relative z-10 text-center max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-block bg-[#ea7048] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                            Inteligencia Artificial
                        </div>
                        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight uppercase tracking-tight">
                            INTELIGENCIA ARTIFICIAL <br className="hidden md:block" />
                            APLICADA AL SECTOR <span className="text-[#52aeb2]">AEC</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
                            Elige tu perfil profesional y descubre cómo te ayudo a potenciar tu forma de diseñar, analizar y gestionar proyectos con IA.
                        </p>

                        {/* CTA Button */}
                        <div className="flex justify-center gap-4 flex-wrap">
                            <Link
                                href="/ia-prompts"
                                className="inline-flex items-center gap-2 bg-[#ea7048] hover:bg-[#d15d36] text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                            >
                                Biblioteca de Prompts
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 2) PROFILES GRID */}
            <section className="container mx-auto px-4 py-20 -mt-10 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {profiles.map((profile, index) => (
                        <motion.div
                            key={profile.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white rounded-[40px] p-10 shadow-xl border border-white hover:shadow-2xl transition-all duration-300 flex flex-col group h-full"
                        >
                            {/* Icon & Badge */}
                            <div className="flex items-start justify-between mb-8">
                                <div className={`p-5 rounded-3xl bg-gradient-to-br ${profile.color} text-white shadow-lg shadow-gray-200 group-hover:scale-110 transition-transform duration-500`}>
                                    {profile.icon}
                                </div>
                                <span className="text-[10px] font-black tracking-widest text-gray-400 bg-gray-50 px-4 py-1.5 rounded-full border border-gray-100 uppercase">
                                    {profile.badge}
                                </span>
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                                <h3 className="text-3xl font-extrabold text-[#2f4860] mb-4">
                                    {profile.title}
                                </h3>
                                <p className="text-[#52aeb2] font-bold text-lg mb-6 leading-tight">
                                    {profile.description}
                                </p>
                                <p className="text-gray-500 text-sm leading-relaxed mb-8 border-l-2 border-gray-100 pl-4 italic">
                                    Enfoque: {profile.focus}
                                </p>
                            </div>

                            {/* CTA */}
                            <Link href={profile.href} className="group/btn relative overflow-hidden bg-gray-50 hover:bg-[#2f4860] p-5 rounded-2xl transition-all duration-300 flex items-center justify-between border border-gray-100 hover:border-[#2f4860]">
                                <span className="font-bold text-[#2f4860] group-hover/btn:text-white transition-colors">
                                    Ver IA para {profile.id === 'construction' ? 'Construcción' : profile.title}
                                </span>
                                <ArrowRight className="w-5 h-5 text-[#ea7048] group-hover/btn:translate-x-1 transition-all" />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* 3) KEY MESSAGE */}
            <section className="container mx-auto px-4 pb-24 text-center">
                <div className="max-w-4xl mx-auto bg-white/40 backdrop-blur-sm rounded-[48px] p-12 border border-white shadow-sm ring-1 ring-black/5">
                    <Zap className="w-10 h-10 text-[#ea7048] mx-auto mb-6" />
                    <h2 className="text-2xl md:text-3xl font-bold text-[#2f4860] leading-relaxed italic">
                        "La Inteligencia Artificial no reemplaza al profesional. <br className="hidden md:block" />
                        Te ayudo a aprovecharla para mejorar tu productividad dentro del <span className="text-[#ea7048]">sector AEC</span>."
                    </h2>
                </div>
            </section>

        </div>
    );
}
