"use client";

import React, { useState } from 'react';
import { BrandHeader } from '@/components/layout/BrandHeader';
import {
    Search,
    Filter,
    FileText,
    Table,
    HardHat,
    ScrollText,
    Building2,
    BookOpen,
    Download,
    ChevronDown,
    Zap,
    Clock,
    Lock,
    CheckCircle2,
    Briefcase,
    Shield,
    Calculator,
    ClipboardList,
    Archive
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Types & Data ---

type DocStatus = 'Listo' | 'En desarrollo' | 'Próximamente';
type Category = 'Gestión' | 'Memorias' | 'Cálculo' | 'Obra' | 'Municipal';

interface DocItem {
    id: string;
    title: string;
    description: string;
    format: 'PDF' | 'Word' | 'Excel';
    category: Category;
    discipline?: string;
    status: DocStatus;
}

const documentationItems: DocItem[] = [
    // 1. Gestión
    { id: 'g1', title: 'Actas de inicio de proyecto', description: 'Formato estándar para formalizar el inicio de actividades y alcances.', format: 'Word', category: 'Gestión', status: 'Listo' },
    { id: 'g2', title: 'Control de cambios (Log)', description: 'Registro técnico de variaciones en diseño y especialidades.', format: 'Excel', category: 'Gestión', status: 'Listo' },
    { id: 'g3', title: 'Seguimiento de trámites', description: 'Dashboard para control de ingresos y aprobaciones municipales.', format: 'Excel', category: 'Gestión', status: 'En desarrollo' },
    { id: 'g4', title: 'Checklists de entrega', description: 'Lista de verificación de hitos para cierre de expedientes.', format: 'PDF', category: 'Gestión', status: 'Listo' },

    // 2. Memorias
    { id: 'm1', title: 'Memoria Descriptiva (Arquitectura)', description: 'Estructura normativa con criterios de diseño y acabados.', format: 'Word', category: 'Memorias', discipline: 'Arquitectura', status: 'Listo' },
    { id: 'm2', title: 'Memoria de Cálculo Estructural', description: 'Plantilla con parámetros de diseño sismorresistente.', format: 'Word', category: 'Memorias', discipline: 'Estructuras', status: 'En desarrollo' },
    { id: 'm3', title: 'Memoria I.S. (Sanitarias)', description: 'Cálculo de dotación, demanda y diámetros de red.', format: 'Word', category: 'Memorias', discipline: 'Sanitarias', status: 'Próximamente' },
    { id: 'm4', title: 'Memoria I.E. (Eléctricas)', description: 'Cuadro de cargas y especificaciones de materiales.', format: 'Word', category: 'Memorias', discipline: 'Eléctricas', status: 'Próximamente' },

    // 3. Hojas de Cálculo
    { id: 'c1', title: 'Calculo de Cimentaciones', description: 'Diseño de zapatas aisladas y combinadas.', format: 'Excel', category: 'Cálculo', status: 'Listo' },
    { id: 'c2', title: 'Presupuesto Base (S10 Style)', description: 'Formato Excel estructurado para fácil exportación.', format: 'Excel', category: 'Cálculo', status: 'Listo' },
    { id: 'c3', title: 'Control de Metrados', description: 'Dynamic sheet para cuantificación de movimiento de tierras.', format: 'Excel', category: 'Cálculo', status: 'En desarrollo' },

    // 4. Obra
    { id: 'o1', title: 'Cuaderno de Obra Digital', description: 'Partes diarios y control de incidencias.', format: 'Excel', category: 'Obra', status: 'Listo' },
    { id: 'o2', title: 'Control de EPP y Seguridad', description: 'Registro de entrega y cumplimiento de normas SST.', format: 'PDF', category: 'Obra', status: 'Listo' },
    { id: 'o3', title: 'Reporte de Avance Semanal', description: 'Plantilla fotográfica y de porcentajes ejecutados.', format: 'Word', category: 'Obra', status: 'En desarrollo' },

    // 5. Municipal
    { id: 'mu1', title: 'Estructura FUE (Referencial)', description: 'Modelado de llenado para licencias de edificación.', format: 'PDF', category: 'Municipal', status: 'Listo' },
    { id: 'mu2', title: 'Cuadro Normativo Comparativo', description: 'Análisis de parámetros urbanísticos vs proyecto.', format: 'Excel', category: 'Municipal', status: 'En desarrollo' },
];

const categories: { label: Category; icon: any }[] = [
    { label: 'Gestión', icon: <Briefcase className="w-4 h-4" /> },
    { label: 'Memorias', icon: <ScrollText className="w-4 h-4" /> },
    { label: 'Cálculo', icon: <Calculator className="w-4 h-4" /> },
    { label: 'Obra', icon: <HardHat className="w-4 h-4" /> },
    { label: 'Municipal', icon: <Building2 className="w-4 h-4" /> },
];

// --- Components ---

export default function DocumentacionAECPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState<Category | 'Todos'>('Todos');

    const filteredItems = documentationItems.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = activeCategory === 'Todos' || item.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-[#f8fafc] font-sans text-[#2f4860]">
            <BrandHeader />

            {/* HERO SECTION */}
            <section className="bg-[#2f4860] pt-24 pb-32 relative overflow-hidden">
                {/* Decoration */}
                <div className="absolute top-0 right-0 w-1/3 h-full opacity-5 pointer-events-none">
                    <svg viewBox="0 0 100 100" className="w-full h-full fill-white">
                        <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
                        </pattern>
                        <rect width="100" height="100" fill="url(#grid)" />
                    </svg>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl mx-left"
                    >
                        <div className="inline-flex items-center gap-2 bg-[#52aeb2]/20 border border-[#52aeb2]/30 px-4 py-1.5 rounded-full text-[#52aeb2] text-xs font-bold uppercase tracking-wider mb-6">
                            <Zap className="w-3 h-3" />
                            Biblioteca Técnica Profesional
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tight">
                            Documentación <span className="text-[#ea7048]">AEC</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-300 leading-relaxed max-w-2xl font-medium">
                            Formatos técnicos, memorias descriptivas y hojas de cálculo para proyectos de arquitectura, ingeniería y construcción en contextos reales.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* MAIN CONTENT Area */}
            <main className="container mx-auto px-4 -mt-16 pb-24 relative z-20">
                {/* Search & Filters Bar */}
                <div className="bg-white rounded-[32px] shadow-xl p-4 md:p-6 mb-12 border border-slate-100">
                    <div className="flex flex-col lg:flex-row gap-6 items-center">
                        {/* Search Input */}
                        <div className="relative flex-1 w-full">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Buscar formato, especialidad o nivel técnico..."
                                className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#52aeb2]/20 transition-all text-slate-700 font-medium"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        {/* Category Buttons */}
                        <div className="flex flex-wrap justify-center gap-2">
                            <button
                                onClick={() => setActiveCategory('Todos')}
                                className={`px-6 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all ${activeCategory === 'Todos' ? 'bg-[#2f4860] text-white' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
                            >
                                Todos
                            </button>
                            {categories.map((cat) => (
                                <button
                                    key={cat.label}
                                    onClick={() => setActiveCategory(cat.label)}
                                    className={`flex items-center gap-2 px-6 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all ${activeCategory === cat.label ? 'bg-[#52aeb2] text-white' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
                                >
                                    {cat.icon}
                                    {cat.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Content Sections */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Left Side: Document List (Lg: 8 cols) */}
                    <div className="lg:col-span-8 space-y-8">
                        {filteredItems.length > 0 ? (
                            <div className="space-y-4">
                                {categories.map(cat => {
                                    const itemsInCat = filteredItems.filter(i => i.category === cat.label);
                                    if (itemsInCat.length === 0) return null;

                                    return (
                                        <div key={cat.label} className="pt-8 first:pt-0">
                                            <div className="flex items-center gap-3 mb-6">
                                                <div className="p-2.5 bg-[#2f4860] text-white rounded-xl">
                                                    {cat.icon}
                                                </div>
                                                <h2 className="text-2xl font-black text-[#2f4860] uppercase tracking-wide">
                                                    {cat.label}
                                                </h2>
                                                <div className="h-px bg-slate-200 flex-1 ml-4 opacity-50"></div>
                                            </div>

                                            <div className="space-y-3">
                                                {itemsInCat.map((item) => (
                                                    <DocumentCard key={item.id} item={item} />
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="bg-white rounded-3xl p-16 text-center border-2 border-dashed border-slate-200">
                                <div className="text-5xl mb-4 opacity-20">📂</div>
                                <h3 className="text-xl font-bold text-slate-400">No se encontraron documentos</h3>
                                <button onClick={() => { setSearchQuery(''); setActiveCategory('Todos') }} className="mt-4 text-[#52aeb2] font-bold hover:underline">
                                    Limpiar filtros
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Right Side: Info & EDU (Lg: 4 cols) */}
                    <aside className="lg:col-span-4 space-y-8">

                        {/* EDU Section */}
                        <div className="bg-[#2f4860] rounded-[32px] p-8 text-white shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <BookOpen className="w-24 h-24" />
                            </div>

                            <h3 className="text-2xl font-black mb-6 uppercase">Guía Práctica</h3>
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#ea7048] flex items-center justify-center font-bold text-sm">1</div>
                                    <div>
                                        <p className="font-bold mb-1">Selecciona por Disciplina</p>
                                        <p className="text-sm text-slate-300">Usa los filtros superiores para navegar entre memorias, cálculos u obra.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#ea7048] flex items-center justify-center font-bold text-sm">2</div>
                                    <div>
                                        <p className="font-bold mb-1">Verifica el Formato</p>
                                        <p className="text-sm text-slate-300">Ofrecemos Excel para cálculos automáticos y Word para memorias editables.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#ea7048] flex items-center justify-center font-bold text-sm">3</div>
                                    <div>
                                        <p className="font-bold mb-1">Adaptación Local</p>
                                        <p className="text-sm text-slate-300">Los formatos están basados en normativas estándar AEC, recuerda validarlos con el RNE.</p>
                                    </div>
                                </div>
                            </div>

                            <button className="w-full mt-8 bg-white/10 hover:bg-white/20 border border-white/20 py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2">
                                <Archive className="w-4 h-4" />
                                Ver Mini-Guías
                            </button>
                        </div>

                        {/* Status Info */}
                        <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm">
                            <h4 className="font-black text-[#2f4860] uppercase mb-4 text-sm tracking-widest">Leyenda de Estado</h4>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                    <span className="text-sm font-bold text-slate-600">Listo: Disponible para descarga directa.</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                                    <span className="text-sm font-bold text-slate-600">En desarrollo: Subiéndose pronto.</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="w-2 h-2 rounded-full bg-slate-300"></span>
                                    <span className="text-sm font-bold text-slate-600">Próximamente: En revisión técnica.</span>
                                </div>
                            </div>
                        </div>

                        {/* Contact Widget */}
                        <div className="bg-[#52aeb2]/10 rounded-[32px] p-8 border border-[#52aeb2]/20 text-center">
                            <p className="text-[#2f4860] font-bold mb-4">¿Buscas un formato específico que no está en la lista?</p>
                            <button className="text-[#52aeb2] font-black hover:underline uppercase tracking-widest text-sm">
                                Solicitar Formato →
                            </button>
                        </div>

                    </aside>
                </div>
            </main>
        </div>
    );
}

// Subcomponent for list items
function DocumentCard({ item }: { item: DocItem }) {
    const isReady = item.status === 'Listo';

    return (
        <motion.div
            layout
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className={`group bg-white p-5 rounded-2xl border transition-all duration-300 flex items-center gap-6 ${isReady ? 'border-slate-100 hover:border-[#52aeb2] hover:shadow-lg' : 'border-slate-50 opacity-70'}`}
        >
            {/* Format Icon */}
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105 duration-300 ${item.format === 'Excel' ? 'bg-emerald-50 text-emerald-600' :
                    item.format === 'Word' ? 'bg-blue-50 text-blue-600' : 'bg-red-50 text-red-600'
                }`}>
                {item.format === 'Excel' ? <Table className="w-6 h-6" /> :
                    item.format === 'Word' ? <FileText className="w-6 h-6" /> : <ScrollText className="w-6 h-6" />}
            </div>

            {/* Content */}
            <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                    <h4 className="font-bold text-lg text-[#2f4860] leading-tight">{item.title}</h4>
                    {item.discipline && (
                        <span className="hidden md:block text-[10px] font-black uppercase text-[#52aeb2] bg-[#52aeb2]/10 px-2 py-0.5 rounded">
                            {item.discipline}
                        </span>
                    )}
                </div>
                <p className="text-sm text-slate-500 line-clamp-1">{item.description}</p>
            </div>

            {/* Status & CTA */}
            <div className="flex items-center gap-6">
                <div className="hidden sm:flex flex-col items-end">
                    <span className={`text-[10px] font-black uppercase tracking-widest mb-1 ${item.status === 'Listo' ? 'text-emerald-500' :
                            item.status === 'En desarrollo' ? 'text-amber-500' : 'text-slate-400'
                        }`}>
                        {item.status}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">{item.format}</span>
                </div>

                {isReady ? (
                    <button className="bg-slate-50 text-[#2f4860] group-hover:bg-[#52aeb2] group-hover:text-white w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300">
                        <Download className="w-5 h-5" />
                    </button>
                ) : (
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-300">
                        <Lock className="w-4 h-4" />
                    </div>
                )}
            </div>
        </motion.div>
    );
}
