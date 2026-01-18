"use client";

import React, { useState, useMemo } from 'react';
import {
    Search,
    Copy,
    CheckCheck,
    ChevronDown,
    ChevronUp,
    Cpu,
    Box,
    Layers,
    Zap,
    FileText,
    ImageIcon,
    Code,
    ArrowRight,
    Download
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Types ---
type Discipline = 'All' | 'Arquitectura' | 'Estructuras' | 'MEP' | 'Visualización' | 'Automatización';
type Software = 'All' | 'AutoCAD' | 'Revit' | 'ETABS' | 'SAP2000' | 'Excel' | 'IA Generativa';
type PromptType = 'All' | 'Generación de planos' | 'Modelado 3D' | 'Análisis técnico' | 'Automatización' | 'Imagen → CAD' | 'Documentación';

interface PromptItem {
    id: string;
    title: string;
    discipline: Discipline;
    software: Software;
    type: PromptType; // Added purely for filtering logic if needed strictly
    description: string;
    fullPrompt: string;
    usageTip: string;
    tags: string[];
}

// --- Mock Data ---
const PROMPTS: PromptItem[] = [
    {
        id: 'p1',
        title: 'Generar planta arquitectónica desde texto',
        discipline: 'Arquitectura',
        software: 'Revit',
        type: 'Generación de planos',
        description: 'Crea una distribución de vivienda unifamiliar detallada.',
        fullPrompt: `Actúa como arquitecto proyectista.
Genera una planta arquitectónica de una vivienda unifamiliar de 120 m²,
con 3 dormitorios, 2 baños, sala-comedor integrados y cocina cerrada.
Considera ventilación cruzada, iluminación natural y circulación eficiente.
Describe los ambientes y su relación espacial.`,
        usageTip: 'Úsalo en ChatGPT o Claude para obtener la memoria descriptiva, o en Midjourney para ideas visuales.',
        tags: ['Vivienda', 'Distribución', 'LOD 200']
    },
    {
        id: 'p2',
        title: 'Análisis estructural preliminar',
        discipline: 'Estructuras',
        software: 'Revit', // Using General/Revit as placeholder
        type: 'Análisis técnico',
        description: 'Evaluación conceptual de un edificio de concreto armado.',
        fullPrompt: `Actúa como ingeniero estructural.
Evalúa de forma conceptual un edificio de 3 niveles de concreto armado
ubicado en zona sísmica alta.
Define el sistema estructural recomendado, tipo de losas,
criterios sísmicos y configuración general.
No realices cálculos numéricos.`,
        usageTip: 'Ideal para memorias de cálculo preliminares o pre-dimensionamiento.',
        tags: ['Concreto', 'Sismos', 'Pre-dimensionamiento']
    },
    {
        id: 'p3',
        title: 'Esquema de instalaciones sanitarias',
        discipline: 'MEP',
        software: 'Revit',
        type: 'Modelado 3D',
        description: 'Define trazado de montantes y ramales para vivienda.',
        fullPrompt: `Actúa como ingeniero sanitario.
Define el esquema conceptual de instalaciones sanitarias
para una vivienda de dos pisos,
incluyendo montantes, ramales, ventilaciones y cajas de registro.
Explica el criterio técnico del trazado.`,
        usageTip: 'Útil para generar la memoria descriptiva de instalaciones (II.SS).',
        tags: ['Sanitarias', 'Tuberías', 'Pendientes']
    },
    {
        id: 'p4',
        title: 'Imagen de contorno para convertir a DXF',
        discipline: 'Automatización',
        software: 'AutoCAD', // Mapped to AutoCAD / IA
        type: 'Imagen → CAD',
        description: 'Genera imagen limpia para vectorizar.',
        fullPrompt: `Genera una imagen en blanco y negro, estilo dibujo técnico,
con líneas limpias y fondo blanco,
optimizada para ser vectorizada y convertida a DXF en AutoCAD.
Representa el contorno de una persona de perfil,
sin sombras ni rellenos.`,
        usageTip: 'Usa este prompt en Midjourney --v 5. o DALL-E 3.',
        tags: ['Vectorización', 'DXF', 'Silueta']
    },
    {
        id: 'p5',
        title: 'Script AutoLISP para automatización',
        discipline: 'Automatización',
        software: 'AutoCAD',
        type: 'Automatización',
        description: 'Código para copiar objetos a capa específica.',
        fullPrompt: `Crea un script AutoLISP que:
– Permita seleccionar objetos
– Los copie a una capa llamada “DETALLE”
– Asigne color ByLayer
– Muestre un mensaje al finalizar
Incluye comentarios en el código.`,
        usageTip: 'Copia el código resultante directamente en el editor Visual LISP (VLIDE).',
        tags: ['AutoLISP', 'Scripting', 'Productividad']
    }
];

export default function PromptLibraryView() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDiscipline, setSelectedDiscipline] = useState<Discipline>('All');
    const [selectedSoftware, setSelectedSoftware] = useState<Software>('All');
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [copiedId, setCopiedId] = useState<string | null>(null);

    // Filter Logic
    const filteredPrompts = useMemo(() => {
        return PROMPTS.filter(p => {
            const matchSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
            const matchDisc = selectedDiscipline === 'All' || p.discipline === selectedDiscipline;
            const matchSoft = selectedSoftware === 'All' || p.software === selectedSoftware; // simplified for now

            return matchSearch && matchDisc && matchSoft;
        });
    }, [searchTerm, selectedDiscipline, selectedSoftware]);

    const handleCopy = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const toggleExpand = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <div className="min-h-screen bg-[#dde8f4] font-sans text-[#2f4860]">

            {/* 1) HERO SECTION */}
            <section className="relative bg-[#2f4860] text-white overflow-hidden py-24 px-4">
                <div className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: 'linear-gradient(#52aeb2 1px, transparent 1px), linear-gradient(90deg, #52aeb2 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

                <div className="container mx-auto relative z-10 text-center max-w-4xl">
                    <div className="inline-block bg-[#ea7048] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                        ACTUALIZADO 2025
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                        Biblioteca de <span className="text-[#52aeb2]">Prompts</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed">
                        Optimiza tu flujo técnico en AutoCAD, Revit y más con nuestra colección de prompts especializados.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => document.getElementById('filters-bar')?.scrollIntoView({ behavior: 'smooth' })}
                            className="bg-[#ea7048] hover:bg-[#d15d36] text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-orange-500/20"
                        >
                            Explorar Prompt <ArrowRight size={20} />
                        </button>
                        <button className="bg-transparent border-2 border-[#52aeb2] text-[#52aeb2] hover:bg-[#52aeb2] hover:text-white px-8 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2">
                            <Download size={20} /> Guía de Uso IA
                        </button>
                    </div>
                </div>
            </section>



            {/* 2) BUSCADOR & FILTROS (Two Category Layout) */}
            <div id="filters-bar" className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 py-3 px-4 transition-all overflow-visible">
                <div className="container mx-auto flex flex-col lg:flex-row gap-4 items-center justify-between overflow-visible">

                    {/* Left: Search */}
                    <div className="relative w-full lg:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Buscar por software, disciplina o palabra clave..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-[#f0f4f8] rounded-xl border-none focus:ring-2 focus:ring-[#52aeb2] transition-all outline-none text-sm text-[#2f4860]"
                        />
                    </div>

                    {/* Right: Two Filter Categories */}
                    <div className="flex items-center gap-4 overflow-visible">

                        {/* CATEGORY 1: Disciplines (Blue) */}
                        <div className="flex items-center gap-2 px-4 py-2 bg-white/50 rounded-xl border border-gray-200/50 overflow-visible">
                            {['All', 'Arquitectura', 'Estructuras', 'MEP'].map((d) => (
                                <button
                                    key={d}
                                    onClick={() => setSelectedDiscipline(d as Discipline)}
                                    className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${selectedDiscipline === d
                                        ? 'bg-[#52aeb2] text-white border-[#52aeb2] shadow-md'
                                        : 'bg-white text-gray-500 border-gray-200 hover:border-[#52aeb2] hover:text-[#52aeb2]'
                                        }`}
                                >
                                    {d === 'All' ? 'Todas' : d}
                                </button>
                            ))}
                        </div>

                        {/* CATEGORY 2: Software (Orange) */}
                        <div className="flex items-center gap-2 px-4 py-2 bg-white/50 rounded-xl border border-gray-200/50 overflow-visible">
                            {['Revit', 'AutoCAD'].map((s) => (
                                <button
                                    key={s}
                                    onClick={() => setSelectedSoftware(selectedSoftware === s ? 'All' : s as Software)}
                                    className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${selectedSoftware === s
                                        ? 'bg-[#ea7048] text-white border-[#ea7048] shadow-md'
                                        : 'bg-white text-gray-500 border-gray-200 hover:border-[#ea7048] hover:text-[#ea7048]'
                                        }`}
                                >
                                    {s}
                                </button>
                            ))}

                            {/* "Más..." Dropdown for Software */}
                            <div className="relative group overflow-visible">
                                <button className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold transition-all border flex items-center gap-1 ${selectedSoftware !== 'All' && selectedSoftware !== 'Revit' && selectedSoftware !== 'AutoCAD'
                                    ? 'bg-[#ea7048] text-white border-[#ea7048] shadow-md'
                                    : 'bg-white text-gray-500 border-gray-200 hover:border-[#ea7048] hover:text-[#ea7048]'
                                    }`}>
                                    {selectedSoftware === 'All' || selectedSoftware === 'Revit' || selectedSoftware === 'AutoCAD'
                                        ? 'Más...'
                                        : selectedSoftware} <ChevronDown size={14} />
                                </button>

                                {/* Hover Dropdown - Aligned Right */}
                                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-100 p-2 hidden group-hover:block z-[9999] animate-in fade-in slide-in-from-top-2 duration-200">
                                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2 py-1 mb-1 border-b border-gray-50">Otros Softwares</div>
                                    <div className="space-y-0.5">
                                        {['ETABS', 'SAP2000', 'Excel', 'IA Generativa'].map(s => (
                                            <button
                                                key={s}
                                                onClick={() => setSelectedSoftware(s as Software)}
                                                className={`block w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${selectedSoftware === s ? 'bg-[#ea7048]/10 text-[#ea7048] font-bold' : 'text-gray-600 hover:bg-[#f0f4f8] hover:text-[#ea7048]'
                                                    }`}
                                            >
                                                {s}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="border-t border-gray-100 mt-1 pt-1">
                                        <button
                                            onClick={() => setSelectedSoftware('All')}
                                            className="block w-full text-left px-3 py-1.5 text-[10px] text-gray-400 hover:text-[#2f4860] font-bold uppercase tracking-tight"
                                        >
                                            Resetear Filtro
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3) LISTADO DE PROMPTS */}
            <section className="container mx-auto px-4 py-12 max-w-4xl">
                <div className="space-y-4">
                    {filteredPrompts.length === 0 ? (
                        <div className="text-center py-20 opacity-50">
                            <div className="inline-block p-6 rounded-full bg-gray-100 mb-4"><Search size={40} /></div>
                            <p className="text-xl font-medium">No se encontraron prompts</p>
                            <p className="text-sm">Prueba ajustando los filtros o tu búsqueda.</p>
                        </div>
                    ) : (
                        filteredPrompts.map((prompt) => (
                            <motion.div
                                layout
                                key={prompt.id}
                                className={`bg-white rounded-2xl border transition-all overflow-hidden ${expandedId === prompt.id ? 'border-[#52aeb2] shadow-lg ring-1 ring-[#52aeb2]/20' : 'border-gray-100 hover:border-gray-200 hover:shadow-md'}`}
                            >
                                {/* Header Row */}
                                <div
                                    onClick={() => toggleExpand(prompt.id)}
                                    className="p-6 cursor-pointer flex flex-col md:flex-row gap-4 items-start md:items-center justify-between"
                                >
                                    <div className="flex-1">
                                        <div className="flex flex-wrap items-center gap-3 mb-2">
                                            <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide text-white ${prompt.discipline === 'Arquitectura' ? 'bg-[#52aeb2]' :
                                                prompt.discipline === 'Estructuras' ? 'bg-[#2f4860]' :
                                                    prompt.discipline === 'MEP' ? 'bg-[#ea7048]' : 'bg-gray-500'
                                                }`}>
                                                {prompt.discipline}
                                            </span>
                                            <span className="flex items-center gap-1 text-xs font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md">
                                                <Box size={12} /> {prompt.software}
                                            </span>
                                        </div>
                                        <h3 className="text-lg font-bold text-[#2f4860]">{prompt.title}</h3>
                                        <p className="text-gray-500 text-sm mt-1">{prompt.description}</p>
                                    </div>

                                    <div className="flex items-center gap-4 self-end md:self-center">
                                        <button className="text-[#52aeb2] font-bold text-sm bg-[#52aeb2]/5 hover:bg-[#52aeb2]/10 px-4 py-2 rounded-lg transition-colors">
                                            {expandedId === prompt.id ? 'Ocultar' : 'Ver prompt'}
                                        </button>
                                        {expandedId === prompt.id ? <ChevronUp size={20} className="text-gray-300" /> : <ChevronDown size={20} className="text-gray-300" />}
                                    </div>
                                </div>

                                {/* Expanded Content */}
                                <AnimatePresence>
                                    {expandedId === prompt.id && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="border-t border-gray-100 bg-[#f8fbfe]"
                                        >
                                            <div className="p-6 md:p-8">
                                                <div className="relative group/code">
                                                    <pre className="bg-white border border-gray-200 rounded-xl p-6 text-gray-700 font-mono text-sm leading-relaxed whitespace-pre-wrap shadow-sm">
                                                        {prompt.fullPrompt}
                                                    </pre>
                                                    <button
                                                        onClick={() => handleCopy(prompt.fullPrompt, prompt.id)}
                                                        className="absolute top-4 right-4 bg-white border border-gray-200 shadow-sm hover:bg-gray-50 text-gray-500 p-2 rounded-lg transition-all flex items-center gap-2 font-sans font-bold text-xs"
                                                    >
                                                        {copiedId === prompt.id ? <CheckCheck size={16} className="text-green-500" /> : <Copy size={16} />}
                                                        {copiedId === prompt.id ? 'Copiado' : 'Copiar'}
                                                    </button>
                                                </div>

                                                <div className="mt-6 flex flex-col md:flex-row gap-6 justify-between items-start">
                                                    <div className="space-y-2">
                                                        <h4 className="text-xs font-bold uppercase text-gray-400 tracking-widest flex items-center gap-2">
                                                            <Zap size={14} /> Sugerencia de uso
                                                        </h4>
                                                        <p className="text-sm text-[#2f4860] max-w-lg">{prompt.usageTip}</p>
                                                    </div>

                                                    <div className="flex flex-wrap gap-2 justify-end">
                                                        {prompt.tags.map(tag => (
                                                            <span key={tag} className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">#{tag}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))
                    )}
                </div>
            </section>

        </div >
    );
}
