"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { BrandHeader } from '@/components/layout/BrandHeader';
import { etabsTutorials, ETABSTutorial } from '@/lib/etabsTutorialsData';
import { SearchOutlined, BookOutlined, ToolOutlined, BulbOutlined } from '@ant-design/icons';

export default function ETABSTutorialsPage() {
    const [searchQuery, setSearchQuery] = useState('');

    // Sort tutorials by date (newest first)
    const sortedTutorials = [...etabsTutorials].sort((a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    // Filter tutorials based on search query
    const filteredTutorials = sortedTutorials.filter(tutorial =>
        tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tutorial.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#dde8f4] font-sans">
            <BrandHeader />

            <main className="container mx-auto px-4 py-8 lg:py-12">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-[#2f4860] mb-4 uppercase tracking-tight">
                        Tutoriales de ETABS
                    </h1>
                    <p className="text-lg md:text-xl text-[#83a0b5] max-w-2xl mx-auto">
                        Aprende análisis estructural, diseño de edificaciones y metodologías de cálculo con ETABS.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* LEFT SIDEBAR: Resources & Future Courses */}
                    <aside className="lg:col-span-1 space-y-8 order-2 lg:order-1">
                        {/* Related Resources */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h3 className="text-xl font-bold text-[#2f4860] mb-6 flex items-center gap-2">
                                <ToolOutlined className="text-[#ea7048]" />
                                Recursos
                            </h3>
                            <ul className="space-y-4">
                                <li>
                                    <Link href="/recursos-formatos" className="group flex flex-col">
                                        <span className="text-[#ea7048] font-bold group-hover:underline flex items-center gap-2">
                                            📥 Hojas de Cálculo
                                        </span>
                                        <span className="text-xs text-gray-400 mt-1">Excel para diseño y verificación</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/ia-prompts-etabs" className="group flex flex-col">
                                        <span className="text-[#ea7048] font-bold group-hover:underline flex items-center gap-2">
                                            🤖 Automatización IA
                                        </span>
                                        <span className="text-xs text-gray-400 mt-1">Scripts y optimización estructural</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Future Courses Placeholder */}
                        <div className="bg-[#2f4860]/5 rounded-2xl p-6 border border-[#2f4860]/10">
                            <h3 className="text-lg font-bold text-[#2f4860] mb-4 opacity-70 flex items-center gap-2">
                                <BookOutlined className="text-[#2f4860]" />
                                Próximos Cursos
                            </h3>
                            <div className="space-y-4">
                                <div className="p-3 border border-dashed border-gray-300 rounded-xl opacity-60 bg-blue-50/30">
                                    <span className="block text-sm font-bold text-[#2f4860] uppercase">Diseño en Concreto Armado</span>
                                    <span className="text-xs text-gray-400">En desarrollo</span>
                                </div>
                                <div className="p-3 border border-dashed border-gray-300 rounded-xl opacity-50">
                                    <span className="block text-sm font-bold text-gray-500 uppercase">Diseño en Acero</span>
                                    <span className="text-xs text-gray-400">Planificado 2026</span>
                                </div>
                                <div className="p-3 border border-dashed border-gray-300 rounded-xl opacity-50">
                                    <span className="block text-sm font-bold text-gray-500 uppercase">Análisis Sísmico Avanzado</span>
                                    <span className="text-xs text-gray-400">Próximamente</span>
                                </div>
                                <div className="p-3 border border-dashed border-gray-300 rounded-xl opacity-50">
                                    <span className="block text-sm font-bold text-gray-500 uppercase">Interacción Suelo-Estructura</span>
                                    <span className="text-xs text-gray-400">En agenda</span>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* MAIN CONTENT: Search & Tutorials */}
                    <div className="lg:col-span-3 order-1 lg:order-2 space-y-8">
                        {/* Search Bar */}
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <SearchOutlined className="text-[#83a0b5] text-xl group-focus-within:text-[#ea7048] transition-colors" />
                            </div>
                            <input
                                type="text"
                                placeholder="Buscar temas (ej. análisis sísmico, muros, diseño, concreto...)"
                                className="w-full bg-white border border-gray-100 rounded-2xl py-4 pl-12 pr-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ea7048]/20 focus:border-[#ea7048] transition-all text-[#2f4860] text-lg"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        {/* Tutorials List */}
                        <div className="space-y-6">
                            {filteredTutorials.length > 0 ? (
                                filteredTutorials.map((tutorial) => (
                                    <div key={tutorial.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100 group">
                                        <div className="grid grid-cols-1 md:grid-cols-5">
                                            {/* Video Thumbnail Area */}
                                            <div className="md:col-span-2 aspect-video bg-black relative">
                                                <iframe
                                                    src={tutorial.videoUrl}
                                                    title={tutorial.title}
                                                    className="w-full h-full"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                ></iframe>
                                            </div>

                                            {/* Content Area */}
                                            <div className="md:col-span-3 p-6 flex flex-col justify-between">
                                                <div>
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="bg-[#3b82f6]/10 text-[#3b82f6] px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider">
                                                            Ingeniería Estructural
                                                        </span>
                                                        <span className="text-gray-400 text-sm italic">
                                                            {new Date(tutorial.date).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })}
                                                        </span>
                                                    </div>
                                                    <h2 className="text-2xl font-bold text-[#2f4860] mb-3 group-hover:text-[#ea7048] transition-colors">
                                                        {tutorial.title}
                                                    </h2>
                                                    <p className="text-gray-500 leading-relaxed line-clamp-2">
                                                        {tutorial.description}
                                                    </p>
                                                </div>
                                                <div className="mt-4 pt-4 border-t border-gray-50">
                                                    <Link href="#" className="text-[#ea7048] font-bold flex items-center gap-2 hover:gap-3 transition-all">
                                                        Ver tutorial del cálculo →
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-20 bg-white/50 rounded-2xl border-2 border-dashed border-gray-200">
                                    <BulbOutlined className="text-4xl text-gray-300 mb-4" />
                                    <p className="text-gray-500 text-lg">No encontramos resultados para tu búsqueda estructural.</p>
                                    <button
                                        onClick={() => setSearchQuery('')}
                                        className="mt-4 text-[#ea7048] font-bold hover:underline"
                                    >
                                        Ver todos los tutoriales de ETABS
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
