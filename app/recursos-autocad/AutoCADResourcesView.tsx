"use client";

import React, { useState, useMemo } from 'react';
import {
    Search,
    Filter,
    Download,
    ChevronDown,
    ChevronUp,
    Star,
    Zap,
    BookOpen,
    Layers,
    Package,
    CheckCircle,
    Play,
    Share2,
    Lock,
    MessageCircle,
    ArrowRight,
    Code,
    FileText,
    Grid
} from 'lucide-react';

// --- Types ---
type ResourceCategory = 'Plantillas' | 'Bloques' | 'Capas' | 'Layouts' | 'Automatizacion' | 'Detalles' | 'Checklists' | 'Estandares' | 'Prompts';
type Discipline = 'All' | 'Arquitectura' | 'Estructuras' | 'Sanitarias' | 'Electricas' | 'Topografia';
type Level = 'Básico' | 'Intermedio' | 'Pro';

interface ResourceItem {
    id: string;
    title: string;
    category: ResourceCategory;
    discipline: Discipline | 'N/A';
    level: Level;
    description: string;
    thumbnail: string;
    isFree?: boolean;
    isPopular?: boolean;
    details: string[]; // List of features for the accordion
}

// --- Mock Data ---
const ALL_RESOURCES: ResourceItem[] = [
    // 1) Plantillas
    {
        id: 'tpl-cad-arq-pro',
        title: 'Plantilla ARQ A1 – Estándar Oficina',
        category: 'Plantillas',
        discipline: 'Arquitectura',
        level: 'Pro',
        description: 'Plantilla completa con capas estandarizadas, estilos de texto/cota anotativos y bloques de título dinámicos.',
        thumbnail: '/assets/img/placeholder_cad_tpl_arq.png',
        isPopular: true,
        details: [
            'Capas configuradas por espesor y color (CTB incluido)',
            'Bloques dinámicos de puertas y ventanas',
            'Layouts A1, A2, A3 listos para plotear',
            'Estilos de tabla para cuadros de vanos'
        ]
    },
    {
        id: 'tpl-cad-top',
        title: 'Plantilla Topografía y Curvas',
        category: 'Plantillas',
        discipline: 'Topografia',
        level: 'Intermedio',
        description: 'Configuración ideal para importar puntos, generar mallas y presentar planos topográficos.',
        thumbnail: '/assets/img/placeholder_cad_tpl_topo.png',
        details: [
            'Estilos de punto personalizados',
            'Capas para curvas mayores y menores',
            'LISP de importación de coordenadas CSV básico incluido'
        ]
    },

    // 2) Bloques
    {
        id: 'blk-puerta-din',
        title: 'Bloque Puerta Dinámica – Lite',
        category: 'Bloques',
        discipline: 'Arquitectura',
        level: 'Básico',
        description: 'Un solo bloque para todos tus proyectos. Ajusta ancho, muro y abatimiento con un clic.',
        thumbnail: '/assets/img/placeholder_cad_blk_door.png',
        isFree: true,
        details: [
            'Acciones de estiramiento (Stretch)',
            'Acciones de simetría (Flip)',
            'Alineación automática a muros'
        ]
    },
    {
        id: 'blk-san-inodoro',
        title: 'Pack Sanitarios: Inodoro + Lavatorio',
        category: 'Bloques',
        discipline: 'Sanitarias',
        level: 'Intermedio',
        description: 'Bloques sanitarios con vistas en planta, corte y elevación.',
        thumbnail: '/assets/img/placeholder_cad_blk_san.png',
        details: [
            'Vistas múltiples (Visibilidad)',
            'Puntos de conexión para tuberías',
            'Escala real en metros'
        ]
    },

    // 3) Capas
    {
        id: 'std-layers-iso',
        title: 'Estándar de Capas ISO 13567',
        category: 'Capas',
        discipline: 'Arquitectura',
        level: 'Pro',
        description: 'Archivo .las y .dwg con la estructura de capas internacional para grandes proyectos.',
        thumbnail: '/assets/img/placeholder_cad_layers.png',
        details: [
            'Nomenclatura estricta (Agente-Elemento-Presentación)',
            'Colores lógicos por espesor',
            'Guía PDF de uso'
        ]
    },

    // 5) Automatización (LISP)
    {
        id: 'lisp-area-tab',
        title: 'LISP: Polígonos a Tabla Excel',
        category: 'Automatizacion',
        discipline: 'All',
        level: 'Pro',
        description: 'Selecciona polígonos cerrados y exporta sus áreas y perímetros directamente a Excel o tabla CAD.',
        thumbnail: '/assets/img/placeholder_cad_lisp_area.png',
        isPopular: true,
        details: [
            'Calcula área acumulada',
            'Numera los polígonos automáticamente (P1, P2...)',
            'Compatible con AutoCAD 2018-2025'
        ]
    },
    {
        id: 'lisp-clean',
        title: 'LISP: Super Limpieza (Purge+Audit)',
        category: 'Automatizacion',
        discipline: 'All',
        level: 'Básico',
        description: 'Script esencial para reducir el peso de tus archivos DWG antes de enviar.',
        thumbnail: '/assets/img/placeholder_cad_lisp_clean.png',
        isFree: true,
        details: [
            'Elimina capas vacías y bloques no usados',
            'Borra filtros de capa corruptos',
            'Resetea la escala de tipos de línea'
        ]
    },

    // 6) Detalles
    {
        id: 'det-cimentacion',
        title: 'Biblioteca de Cimentaciones',
        category: 'Detalles',
        discipline: 'Estructuras',
        level: 'Intermedio',
        description: 'Zapatas aisladas, corridas y plateas. Detalles típicos listos para insertar.',
        thumbnail: '/assets/img/placeholder_cad_det_cim.png',
        details: [
            '20 detalles en formato DWG',
            'Textos editables',
            'Hatchs pre-configurados'
        ]
    },

    // 10) Prompts
    {
        id: 'prompt-autolisp-gen',
        title: 'Prompt: Generador de AutoLISP con IA',
        category: 'Prompts',
        discipline: 'N/A',
        level: 'Pro',
        description: 'Crea tus propias herramientas. Prompt optimizado para que ChatGPT escriba código LISP funcional.',
        thumbnail: '/assets/img/placeholder_prompt_cad.png',
        details: [
            'Estructura de comandos defun c:',
            'Manejo de errores básico incluido',
            'Ejemplos para selección de entidades'
        ]
    }
];

export default function AutoCADResourcesView() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDiscipline, setSelectedDiscipline] = useState<Discipline>('All');
    const [selectedSort, setSelectedSort] = useState<'Popular' | 'Newest'>('Popular');

    // Accordion State
    const [openAccordionId, setOpenAccordionId] = useState<string | null>(null);

    // Filter Logic
    const filteredResources = useMemo(() => {
        return ALL_RESOURCES.filter(item => {
            const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesDiscipline = selectedDiscipline === 'All' || item.discipline === selectedDiscipline || item.discipline === 'All' || item.discipline === 'N/A';
            return matchesSearch && matchesDiscipline;
        });
    }, [searchTerm, selectedDiscipline]);

    const resourcesByCategory = useMemo(() => {
        const groups: Partial<Record<ResourceCategory, ResourceItem[]>> = {};
        filteredResources.forEach(item => {
            if (!groups[item.category]) groups[item.category] = [];
            groups[item.category]!.push(item);
        });
        return groups;
    }, [filteredResources]);

    const toggleAccordion = (id: string) => {
        setOpenAccordionId(openAccordionId === id ? null : id);
    };

    const CATEGORIES: { key: ResourceCategory; label: string; icon: React.ReactNode }[] = [
        { key: 'Plantillas', label: 'Plantillas (DWT)', icon: <Layers size={18} /> },
        { key: 'Bloques', label: 'Bloques Dinámicos', icon: <Grid size={18} /> },
        { key: 'Automatizacion', label: 'AutoLISP & Scripts', icon: <Code size={18} /> },
        { key: 'Capas', label: 'Estándares de Capas', icon: <ListFilterIcon size={18} /> },
        { key: 'Layouts', label: 'Layouts y Ploteo', icon: <FileText size={18} /> },
        { key: 'Detalles', label: 'Detalles 2D', icon: <Search size={18} /> },
        { key: 'Checklists', label: 'Checklists', icon: <CheckCircle size={18} /> },
        { key: 'Prompts', label: 'Prompts IA', icon: <MessageCircle size={18} /> },
    ];

    return (
        <div className="bg-[#dde8f4] min-h-screen text-[#2f4860] font-sans">

            {/* A) HERO SECTION */}
            <section className="relative bg-[#2f4860] text-white overflow-hidden py-24 px-4">
                <div className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: 'linear-gradient(#52aeb2 1px, transparent 1px), linear-gradient(90deg, #52aeb2 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

                <div className="container mx-auto relative z-10 text-center max-w-4xl">
                    <div className="inline-block bg-[#ea7048] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                        Optimizado para flujo profesional
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                        Recursos de <span className="text-[#52aeb2]">AutoCAD</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed">
                        La caja de herramientas esencial: bloques dinámicos, plantillas DWT y rutinas LISP que te ahorrarán horas.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => document.getElementById('filters-bar')?.scrollIntoView({ behavior: 'smooth' })}
                            className="bg-[#ea7048] hover:bg-[#d15d36] text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-orange-500/20"
                        >
                            Explorar Recursos <ArrowRight size={20} />
                        </button>
                        <button className="bg-transparent border-2 border-[#52aeb2] text-[#52aeb2] hover:bg-[#52aeb2] hover:text-white px-8 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2">
                            <Download size={20} /> Descargar Pack Gratuito
                        </button>
                    </div>
                </div>
            </section>

            {/* B) STICKY SEARCH & FILTERS */}
            <div id="filters-bar" className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100 py-4 px-4 transition-all">
                <div className="container mx-auto flex flex-col md:flex-row gap-4 items-center justify-between">

                    {/* Search */}
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Buscar LISP, bloque o plantilla..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-[#f0f4f8] rounded-xl border-none focus:ring-2 focus:ring-[#52aeb2] transition-all outline-none text-[#2f4860]"
                        />
                    </div>

                    {/* Filters */}
                    <div className="flex flex-wrap gap-2 justify-center">
                        {['All', 'Arquitectura', 'Estructuras', 'Sanitarias', 'Electricas'].map((disc) => (
                            <button
                                key={disc}
                                onClick={() => setSelectedDiscipline(disc as Discipline)}
                                className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${selectedDiscipline === disc
                                        ? 'bg-[#2f4860] text-white shadow-md'
                                        : 'bg-white border border-gray-200 text-gray-500 hover:bg-gray-50'
                                    }`}
                            >
                                {disc === 'All' ? 'Todas' : disc}
                            </button>
                        ))}
                    </div>

                    {/* Sort */}
                    <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                        <Filter size={16} />
                        <select
                            value={selectedSort}
                            onChange={(e) => setSelectedSort(e.target.value as any)}
                            className="bg-transparent border-none outline-none cursor-pointer focus:text-[#ea7048]"
                        >
                            <option value="Popular">Más Popular</option>
                            <option value="Newest">Más Recientes</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 space-y-20">

                {/* C) PACK GRATUITO */}
                <section className="bg-gradient-to-br from-[#2f4860] to-[#1e2e3e] rounded-3xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-[#52aeb2] opacity-10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                        <div className="w-full md:w-1/2">
                            <div className="inline-flex items-center gap-2 bg-[#52aeb2]/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-bold mb-6 text-[#52aeb2]">
                                <Zap className="fill-current" size={16} />
                                CAD Essentials 2025
                            </div>
                            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Pack AutoCAD <span className="text-[#2f4860] bg-white px-2 rounded-md">Starter</span></h2>
                            <p className="text-lg opacity-90 mb-8 max-w-lg">
                                Empieza con el pie derecho. Plantilla limpia, bloques básicos dinámicos y el LISP que usa Vyktor todos los días.
                            </p>
                            <ul className="space-y-3 mb-8">
                                {['Plantilla A1 Genérica (.dwg)', 'Pack Bloques Puertas/Ventanas', 'LISP "Super Limpieza" v1.0', 'Checklist de Ploteo PDF'].map(item => (
                                    <li key={item} className="flex items-center gap-2">
                                        <CheckCircle size={20} className="text-[#52aeb2]" /> {item}
                                    </li>
                                ))}
                            </ul>
                            <button className="bg-[#52aeb2] hover:bg-[#43969a] text-white px-8 py-4 rounded-xl font-bold flex items-center gap-3 transition-transform hover:-translate-y-1 shadow-lg">
                                <Download size={20} /> Descargar Gratis
                            </button>
                        </div>
                        {/* Visual Placeholder for Pack */}
                        <div className="w-full md:w-1/2 flex justify-center">
                            <div className="relative w-full max-w-sm aspect-[4/3] bg-white/5 rounded-2xl border-2 border-white/10 backdrop-blur-sm flex items-center justify-center">
                                <Layers size={80} className="text-white opacity-50" />
                                <span className="absolute bottom-4 text-sm opacity-75">Preview de Capas</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* D) RESOURCE SECTIONS */}
                {CATEGORIES.map((category) => {
                    const items = resourcesByCategory[category.key];
                    if (!items || items.length === 0) return null;

                    return (
                        <section key={category.key} id={category.key.toLowerCase()} className="scroll-mt-28">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 rounded-xl bg-[#2f4860] flex items-center justify-center text-white">
                                    {category.icon}
                                </div>
                                <div>
                                    <h2 className="text-3xl font-bold text-[#2f4860]">{category.label}</h2>
                                    <p className="text-[#83a0b5]">Herramientas técnicas para arquitectos e ingenieros.</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {items.map((item) => (
                                    <div key={item.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group">
                                        {/* Thumbnail */}
                                        <div className="h-48 bg-gray-100 relative overflow-hidden">
                                            <div className="absolute top-4 left-4 z-10 flex gap-2">
                                                <span className={`px-2 py-1 rounded-md text-xs font-bold uppercase tracking-wide text-white ${item.level === 'Pro' ? 'bg-[#ea7048]' : 'bg-[#52aeb2]'}`}>
                                                    {item.level}
                                                </span>
                                                {item.isFree && (
                                                    <span className="bg-[#10b981] text-white px-2 py-1 rounded-md text-xs font-bold uppercase tracking-wide">
                                                        FREE
                                                    </span>
                                                )}
                                            </div>

                                            <div className="w-full h-full flex items-center justify-center bg-[#f0f4f8] text-gray-300 group-hover:scale-105 transition-transform duration-500">
                                                <Grid size={48} />
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-6 flex-grow flex flex-col">
                                            <div className="mb-4">
                                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{item.discipline}</span>
                                                <h3 className="text-xl font-bold text-[#2f4860] mt-1 group-hover:text-[#ea7048] transition-colors">{item.title}</h3>
                                            </div>

                                            <p className="text-gray-500 text-sm mb-6 line-clamp-3">{item.description}</p>

                                            <div className="mt-auto pt-4 border-t border-gray-100">
                                                {/* Accordion */}
                                                <button
                                                    onClick={() => toggleAccordion(item.id)}
                                                    className="w-full flex items-center justify-between text-sm font-bold text-[#52aeb2] hover:text-[#2f4860] transition-colors mb-4"
                                                >
                                                    <span>{openAccordionId === item.id ? 'Ocultar detalles' : 'Ver qué incluye'}</span>
                                                    {openAccordionId === item.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                                </button>

                                                {/* Accordion Content */}
                                                {openAccordionId === item.id && (
                                                    <div className="bg-[#f8fbfe] p-4 rounded-xl mb-4 text-sm text-gray-600 animate-in fade-in slide-in-from-top-2 duration-200">
                                                        <ul className="space-y-2">
                                                            {item.details.map((detail, idx) => (
                                                                <li key={idx} className="flex items-start gap-2">
                                                                    <ArrowRight size={14} className="mt-1 text-[#ea7048] flex-shrink-0" />
                                                                    <span>{detail}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}

                                                <button className="w-full bg-[#2f4860] text-white py-3 rounded-xl font-bold hover:bg-[#ea7048] transition-colors flex items-center justify-center gap-2">
                                                    {item.isFree ? <Download size={18} /> : <Lock size={18} />}
                                                    {item.isFree ? 'Descargar' : 'Obtener Acceso'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    );
                })}

                {/* E) MONETIZACIÓN */}
                <section className="bg-white rounded-3xl p-10 md:p-16 text-center border border-gray-100 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#52aeb2] via-[#ea7048] to-[#2f4860]"></div>

                    <h2 className="text-4xl font-extrabold text-[#2f4860] mb-4">Packs Premium AutoCAD</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto mb-12">Desde estudiantes hasta oficinas técnicas. Todo estandarizado.</p>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-left">
                        {/* Pack 1 */}
                        <div className="border border-gray-200 rounded-2xl p-6 hover:border-[#52aeb2] hover:shadow-xl transition-all">
                            <h3 className="text-lg font-bold text-[#2f4860] mb-1">Pack Estudiante</h3>
                            <div className="text-3xl font-extrabold text-[#52aeb2] mb-4">$15</div>
                            <ul className="space-y-2 mb-6 text-gray-600 text-xs">
                                <li className="flex gap-2"><CheckCircle size={14} className="text-[#52aeb2]" /> Bloques Mobiliario</li>
                                <li className="flex gap-2"><CheckCircle size={14} className="text-[#52aeb2]" /> Cajetines A1-A3</li>
                            </ul>
                            <button className="w-full border-2 border-[#52aeb2] text-[#52aeb2] py-2 rounded-lg font-bold text-sm hover:bg-[#52aeb2] hover:text-white transition-colors">Ver todo</button>
                        </div>

                        {/* Pack 2 */}
                        <div className="border border-gray-200 rounded-2xl p-6 hover:border-[#52aeb2] hover:shadow-xl transition-all relative">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#ea7048] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">POPULAR</div>
                            <h3 className="text-lg font-bold text-[#2f4860] mb-1">Pack Proyectista</h3>
                            <div className="text-3xl font-extrabold text-[#ea7048] mb-4">$35</div>
                            <ul className="space-y-2 mb-6 text-gray-600 text-xs">
                                <li className="flex gap-2"><CheckCircle size={14} className="text-[#ea7048]" /> 5 Rutinas LISP</li>
                                <li className="flex gap-2"><CheckCircle size={14} className="text-[#ea7048]" /> Plantilla PRO</li>
                                <li className="flex gap-2"><CheckCircle size={14} className="text-[#ea7048]" /> Detalle Constructivos</li>
                            </ul>
                            <button className="w-full bg-[#ea7048] text-white py-2 rounded-lg font-bold text-sm hover:bg-[#d15d36] transition-colors">Comprar</button>
                        </div>

                        {/* Pack 3 */}
                        <div className="border border-gray-200 rounded-2xl p-6 hover:border-[#52aeb2] hover:shadow-xl transition-all">
                            <h3 className="text-lg font-bold text-[#2f4860] mb-1">Pack Oficina</h3>
                            <div className="text-3xl font-extrabold text-[#52aeb2] mb-4">$89</div>
                            <ul className="space-y-2 mb-6 text-gray-600 text-xs">
                                <li className="flex gap-2"><CheckCircle size={14} className="text-[#52aeb2]" /> Manual de Estándares</li>
                                <li className="flex gap-2"><CheckCircle size={14} className="text-[#52aeb2]" /> 5 Licencias LISP</li>
                                <li className="flex gap-2"><CheckCircle size={14} className="text-[#52aeb2]" /> Soporte Técnico</li>
                            </ul>
                            <button className="w-full border-2 border-[#52aeb2] text-[#52aeb2] py-2 rounded-lg font-bold text-sm hover:bg-[#52aeb2] hover:text-white transition-colors">Empresas</button>
                        </div>

                        {/* Pack 4 */}
                        <div className="border border-gray-200 rounded-2xl p-6 hover:border-[#52aeb2] hover:shadow-xl transition-all">
                            <h3 className="text-lg font-bold text-[#2f4860] mb-1">Pack MEP</h3>
                            <div className="text-3xl font-extrabold text-[#52aeb2] mb-4">$45</div>
                            <ul className="space-y-2 mb-6 text-gray-600 text-xs">
                                <li className="flex gap-2"><CheckCircle size={14} className="text-[#52aeb2]" /> Simbología Eléctrica</li>
                                <li className="flex gap-2"><CheckCircle size={14} className="text-[#52aeb2]" /> Bloques Sanitarios</li>
                                <li className="flex gap-2"><CheckCircle size={14} className="text-[#52aeb2]" /> Tipos de Línea</li>
                            </ul>
                            <button className="w-full border-2 border-[#52aeb2] text-[#52aeb2] py-2 rounded-lg font-bold text-sm hover:bg-[#52aeb2] hover:text-white transition-colors">Ver todo</button>
                        </div>
                    </div>
                </section>

                {/* F) FAQ */}
                <section className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-[#2f4860] text-center mb-8">Preguntas Frecuentes</h2>
                    <div className="space-y-4">
                        {[
                            { q: '¿Necesito conocimientos de programación para usar los LISP?', a: 'No. Todos nuestros scripts vienen con instrucciones simples: Arrastrar, Soltar y escribir el comando abreviado.' },
                            { q: '¿Qué versiones de AutoCAD son compatibles?', a: 'Los bloques y plantillas se guardan en versión 2018 para máxima compatibilidad. Los LISP funcionan desde 2015 en adelante.' },
                            { q: '¿Qué diferencia hay entre CTB y STB?', a: 'Nuestras plantillas usan CTB (Color Dependent) por ser el estándar más común en la industria de la construcción en LATAM.' }
                        ].map((faq, i) => (
                            <details key={i} className="bg-white rounded-xl p-6 shadow-sm group cursor-pointer border border-transparent hover:border-gray-200 open:ring-2 open:ring-[#52aeb2]/20">
                                <summary className="flex justify-between items-center font-bold text-[#2f4860] list-none">
                                    {faq.q}
                                    <span className="text-[#52aeb2] group-open:rotate-180 transition-transform"><ChevronDown /></span>
                                </summary>
                                <p className="mt-4 text-gray-600 leading-relaxed text-sm pl-4 border-l-2 border-[#52aeb2]">
                                    {faq.a}
                                </p>
                            </details>
                        ))}
                    </div>
                </section>
            </div>

            {/* G) FINAL CTA */}
            <section className="bg-[#2f4860] text-white py-20 text-center px-4">
                <h2 className="text-3xl font-bold mb-4">¿Buscas un recurso específico?</h2>
                <p className="text-gray-400 mb-8">Si necesitas un bloque dinámico a medida o un script especial, contáctanos.</p>
                <div className="flex justify-center gap-4">
                    <button className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg transition-all">
                        <MessageCircle size={20} /> Solicitar por WhatsApp
                    </button>
                </div>
            </section>

        </div>
    );
}

// Icon helper
function ListFilterIcon({ size }: { size: number }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M3 6h18" /><path d="M7 12h10" /><path d="M10 18h4" />
        </svg>
    )
}
