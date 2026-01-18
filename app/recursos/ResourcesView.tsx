"use client";

import React from 'react';
import Link from 'next/link';
import {
    Box,
    Layout,
    FileText,
    ArrowRight,
    Download,
    Layers,
    FolderOpen,
    ClipboardCheck
} from 'lucide-react';
import { motion } from 'framer-motion';

const resourceCategories = [
    {
        id: 'revit',
        title: 'Recursos Revit',
        description: 'Plantillas, familias y scripts optimizados para flujos BIM.',
        focus: 'Aumenta tu productividad con activos listos para usar en proyectos reales.',
        href: '/recursos-revit',
        icon: <Box className="w-8 h-8" />,
        color: 'from-[#2f4860] to-[#1e2e3e]', // Professional Blue
        badge: 'BIM / REVIT'
    },
    {
        id: 'autocad',
        title: 'Recursos AutoCAD',
        description: 'Bloques dinámicos, rutinas LISP y estándares de dibujo.',
        focus: 'Librerías técnicas diseñadas para acelerar tu dibujo y detallado técnico.',
        href: '/recursos-autocad',
        icon: <Layout className="w-8 h-8" />,
        color: 'from-[#52aeb2] to-[#45969a]', // Brand Teal
        badge: 'CAD / DIBUJO'
    },
    {
        id: 'docs',
        title: 'Documentación AEC',
        description: 'Formatos técnicos, memorias y hojas de cálculo.',
        focus: 'Material de apoyo para la gestión, seguimiento y documentación técnica de proyectos, incluyendo cálculos estructurales, sanitarios y metrados.',
        href: '/recursos/documentacion-aec', // Updated from #
        icon: <FileText className="w-8 h-8" />,
        color: 'from-[#ea7048] to-[#d15d36]', // Brand Orange
        badge: 'GESTIÓN / DOCS'
    }
];

export default function ResourcesView() {
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
                            Librería de Activos
                        </div>
                        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight uppercase tracking-tight">
                            RECURSOS TÉCNICOS <br className="hidden md:block" />
                            PARA EL SECTOR <span className="text-[#52aeb2]">AEC</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 mb-0 leading-relaxed max-w-3xl mx-auto">
                            Descarga activos especializados, herramientas de automatización y plantillas que he diseñado para facilitar tu trabajo profesional.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* 2) RESOURCES GRID */}
            <section className="container mx-auto px-4 py-20 -mt-10 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {resourceCategories.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white rounded-[40px] p-10 shadow-xl border border-white hover:shadow-2xl transition-all duration-300 flex flex-col group h-full"
                        >
                            {/* Icon & Badge */}
                            <div className="flex items-start justify-between mb-8">
                                <div className={`p-5 rounded-3xl bg-gradient-to-br ${item.color} text-white shadow-lg shadow-gray-200 group-hover:scale-110 transition-transform duration-500`}>
                                    {item.icon}
                                </div>
                                <span className="text-[10px] font-black tracking-widest text-gray-400 bg-gray-50 px-4 py-1.5 rounded-full border border-gray-100 uppercase">
                                    {item.badge}
                                </span>
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                                <h3 className="text-3xl font-extrabold text-[#2f4860] mb-4">
                                    {item.title}
                                </h3>
                                <p className="text-[#52aeb2] font-bold text-lg mb-6 leading-tight">
                                    {item.description}
                                </p>
                                <p className="text-gray-500 text-sm leading-relaxed mb-8 border-l-2 border-gray-100 pl-4 italic">
                                    {item.focus}
                                </p>
                            </div>

                            {/* CTA */}
                            <Link href={item.href} className="group/btn relative overflow-hidden bg-gray-50 hover:bg-[#2f4860] p-5 rounded-2xl transition-all duration-300 flex items-center justify-between border border-gray-100 hover:border-[#2f4860]">
                                <span className="font-bold text-[#2f4860] group-hover/btn:text-white transition-colors">
                                    {`Ver ${item.title}`}
                                </span>
                                <ArrowRight className="w-5 h-5 text-[#ea7048] group-hover/btn:translate-x-1 transition-all" />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* 3) COLLABORATION MESSAGE */}
            <section className="container mx-auto px-4 pb-24 text-center">
                <div className="max-w-4xl mx-auto bg-white/40 backdrop-blur-sm rounded-[48px] p-12 border border-white shadow-sm ring-1 ring-black/5">
                    <FolderOpen className="w-10 h-10 text-[#52aeb2] mx-auto mb-6" />
                    <p className="text-xl md:text-2xl font-bold text-[#2f4860] leading-relaxed italic">
                        "Actualizo constantemente mi biblioteca con nuevos recursos dinámicos. <br className="hidden md:block" />
                        Si necesitas algún recurso específico, contáctame."
                    </p>
                </div>
            </section>

        </div>
    );
}
