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
    ArrowRight
} from 'lucide-react';

// --- Types ---
type ResourceCategory = 'Plantillas' | 'Familias' | 'Detalles' | 'Presentacion' | 'Automatizacion' | 'Checklists' | 'Estandares' | 'Prompts';
type Discipline = 'All' | 'Arquitectura' | 'Estructuras' | 'MEP' | 'Coordinacion';
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
        id: 'tpl-arq-residencial',
        title: 'Plantilla ARQ – Residencial v2',
        category: 'Plantillas',
        discipline: 'Arquitectura',
        level: 'Intermedio',
        description: 'Plantilla optimizada para vivienda unifamiliar y multifamiliar. Incluye tipos de muros, puertas y ventanas estándar.',
        thumbnail: '/assets/img/placeholder_template_arq.png',
        isPopular: true,
        details: [
            'Navegador de proyectos organizado por Fases (Anteproyecto, Municipal, Ejecutivo)',
            '15 Tipos de Muros configurados',
            'Planta de techos y cuadros de vanos automáticos',
            'Configuración de grosores de línea (Lineweights) lista para plotear'
        ]
    },
    {
        id: 'tpl-est-concreto',
        title: 'Plantilla EST – Concreto Armado',
        category: 'Plantillas',
        discipline: 'Estructuras',
        level: 'Pro',
        description: 'Todo lo necesario para modelar y detallar estructuras de concreto reforzado.',
        thumbnail: '/assets/img/placeholder_template_est.png',
        details: [
            'Filtros de vista para calibres de acero',
            'Tablas de planificación de armaduras configuradas (Shape Code)',
            'Etiquetas de vigas, columnas y zapatas automáticas'
        ]
    },

    // 2) Familias
    {
        id: 'fam-puerta-param',
        title: 'Familia Puerta Paramétrica – Lite',
        category: 'Familias',
        discipline: 'Arquitectura',
        level: 'Básico',
        description: 'Puerta batiente simple, ligera y 100% paramétrica. Ideal para modelos LOD 200.',
        thumbnail: '/assets/img/placeholder_fam_door.png',
        isFree: true,
        details: [
            'Parámetros de Ancho, Alto y Espesor de muro',
            'Material de hoja y marco editables',
            'Simbología 2D limpia para planos'
        ]
    },
    {
        id: 'fam-mep-codo',
        title: 'Codo Sanitario PVC – Genérico',
        category: 'Familias',
        discipline: 'MEP',
        level: 'Intermedio',
        description: 'Accesorio de tubería optimizado para ruteo automático.',
        thumbnail: '/assets/img/placeholder_fam_pipe.png',
        details: [
            'Conectores configurados correctamente (System Type)',
            'Tablas de búsqueda (Lookup Tables) incluidas',
            'Peso reducido (<300kb)'
        ]
    },

    // 3) Detalles
    {
        id: 'det-muro-cortina',
        title: 'Pack Detalles: Muro Cortina',
        category: 'Detalles',
        discipline: 'Arquitectura',
        level: 'Pro',
        description: 'Colección de detalles constructivos 2D de encuentros de muro cortina con losas.',
        thumbnail: '/assets/img/placeholder_det_curtain.png',
        details: [
            '10 Detalles en Vistas de Diseño (Drafting Views)',
            'Componentes de detalle repetitivos incluidos',
            'Compatible con Revit 2022+'
        ]
    },

    // 5) Automatización
    {
        id: 'script-renombrar',
        title: 'Dynamo: Renombrar Vistas Batch',
        category: 'Automatizacion',
        discipline: 'Coordinacion',
        level: 'Básico',
        description: 'Script para añadir prefijos o sufijos a cientos de vistas en un clic.',
        thumbnail: '/assets/img/placeholder_dyn_rename.png',
        isFree: true,
        details: [
            'Input: Texto a buscar y reemplazar',
            'Funciona en Vistas y Planos (Sheets)',
            'Requiere Dynamo 2.3 o superior'
        ]
    },
    {
        id: 'pyrevit-tools',
        title: 'Guía de Instalación pyRevit + Scripts Básicos',
        category: 'Automatizacion',
        discipline: 'Coordinacion',
        level: 'Intermedio',
        description: 'Recopilación de los mejores scripts de la comunidad para pyRevit.',
        thumbnail: '/assets/img/placeholder_pyrevit.png',
        details: [
            'Instrucciones de instalación paso a paso',
            '5 Scripts esenciales de limpieza de modelo',
            'Auditoría rápida de "Warnings"'
        ]
    },

    // 8) Prompts
    {
        id: 'prompt-python-revit',
        title: 'Prompt: Generador de Scripts Python para Revit API',
        category: 'Prompts',
        discipline: 'N/A',
        level: 'Pro',
        description: 'Prompt avanzado para pedirle a ChatGPT/Gemini código Python funcional para Revit.',
        thumbnail: '/assets/img/placeholder_prompt.png',
        details: [
            'Estructura de contexto para la IA',
            'Ejemplos de "Few-Shot"',
            'Instrucciones para manejo de transacciones en Revit API'
        ]
    }
];

export default function RevitResourcesView() {
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
            const matchesDiscipline = selectedDiscipline === 'All' || item.discipline === selectedDiscipline;
            return matchesSearch && matchesDiscipline;
        });
    }, [searchTerm, selectedDiscipline]);

    // Group by Category for display
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
        { key: 'Plantillas', label: 'Plantillas (RTE)', icon: <Layers size={18} /> },
        { key: 'Familias', label: 'Familias (RFA)', icon: <Package size={18} /> },
        { key: 'Detalles', label: 'Detalles 2D/3D', icon: <Search size={18} /> },
        { key: 'Presentacion', label: 'Hojas y Presentación', icon: <BookOpen size={18} /> },
        { key: 'Automatizacion', label: 'Automatización', icon: <Zap size={18} /> },
        { key: 'Checklists', label: 'Checklists', icon: <CheckCircle size={18} /> },
        { key: 'Estandares', label: 'Estándares BIM', icon: <BookOpen size={18} /> },
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
                        Actualizado 2025
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                        Recursos de <span className="text-[#52aeb2]">Revit</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed">
                        La biblioteca definitiva de plantillas, familias, scripts y herramientas para potenciar tus proyectos BIM.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => document.getElementById('filters-bar')?.scrollIntoView({ behavior: 'smooth' })}
                            className="bg-[#ea7048] hover:bg-[#d15d36] text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-orange-500/20"
                        >
                            Explorar Biblioteca <ArrowRight size={20} />
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
                            placeholder="Buscar por nombre, tipo o disciplina..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-[#f0f4f8] rounded-xl border-none focus:ring-2 focus:ring-[#52aeb2] transition-all outline-none text-[#2f4860]"
                        />
                    </div>

                    {/* Filters */}
                    <div className="flex flex-wrap gap-2 justify-center">
                        {['All', 'Arquitectura', 'Estructuras', 'MEP'].map((disc) => (
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

                {/* C) PACK GRATUITO (One-Click) */}
                <section className="bg-gradient-to-br from-[#52aeb2] to-[#43969a] rounded-3xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                        <div className="w-full md:w-1/2">
                            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-bold mb-6">
                                <Star className="text-yellow-300 fill-current" size={16} />
                                Starter Kit 2025
                            </div>
                            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Pack <span className="text-[#2f4860] bg-white px-2 rounded-md">Gratuito</span> de Bienvenida</h2>
                            <p className="text-lg opacity-90 mb-8 max-w-lg">
                                Descarga una selección curada de nuestras mejores familias, un script de Dynamo esencial y nuestra checklist de control de calidad.
                            </p>
                            <ul className="space-y-3 mb-8">
                                {['1 Plantilla Arquitectónica Demo', '3 Familias Paramétricas (Puerta, Ventana, Mueble)', '1 Script Dynamo (Limpieza)', 'Checklist PDF de Entrega'].map(item => (
                                    <li key={item} className="flex items-center gap-2">
                                        <CheckCircle size={20} className="text-[#2f4860]" /> {item}
                                    </li>
                                ))}
                            </ul>
                            <button className="bg-[#2f4860] hover:bg-[#1e2e3e] text-white px-8 py-4 rounded-xl font-bold flex items-center gap-3 transition-transform hover:-translate-y-1 shadow-lg">
                                <Download size={20} /> Descargar ZIP Ahora
                            </button>
                        </div>
                        {/* Visual Placeholder for Pack */}
                        <div className="w-full md:w-1/2 flex justify-center">
                            <div className="relative w-full max-w-sm aspect-[4/3] bg-white/10 rounded-2xl border-2 border-white/20 backdrop-blur-md flex items-center justify-center">
                                <Package size={80} className="text-white opacity-50" />
                                <span className="absolute bottom-4 text-sm opacity-75">Preview del Pack</span>
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
                                    <p className="text-[#83a0b5]">Recursos seleccionados y validados para producción.</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {items.map((item) => (
                                    <div key={item.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group">
                                        {/* Header / Thumbnail Placeholder */}
                                        <div className="h-48 bg-gray-100 relative overflow-hidden">
                                            {/* Badge */}
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
                                                {/* Use image if available, else icon */}
                                                <Layers size={48} />
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
                                                {/* Accordion Trigger */}
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

                {/* E) MONETIZACIÓN / TIENDA (Static Preview) */}
                <section className="bg-white rounded-3xl p-10 md:p-16 text-center border border-gray-100 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#52aeb2] via-[#ea7048] to-[#2f4860]"></div>

                    <h2 className="text-4xl font-extrabold text-[#2f4860] mb-4">Packs Premium</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto mb-12">Acelera tu flujo de trabajo con nuestros paquetes completos. Todo configurado, listo para usar.</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                        {/* Pack 1 */}
                        <div className="border border-gray-200 rounded-2xl p-8 hover:border-[#52aeb2] hover:shadow-xl transition-all relative">
                            <h3 className="text-2xl font-bold text-[#2f4860] mb-2">Pack Estudiante</h3>
                            <p className="text-gray-400 mb-6 text-sm">Ideal para entregas universitarias.</p>
                            <div className="text-4xl font-extrabold text-[#52aeb2] mb-6">$19</div>
                            <ul className="space-y-3 mb-8 text-gray-600 text-sm">
                                <li className="flex gap-2"><CheckCircle size={16} className="text-[#52aeb2]" /> Plantilla Académica</li>
                                <li className="flex gap-2"><CheckCircle size={16} className="text-[#52aeb2]" /> 50+ Familias Básicas</li>
                                <li className="flex gap-2"><CheckCircle size={16} className="text-[#52aeb2]" /> Carátulas Láminas A1-A0</li>
                            </ul>
                            <button className="w-full border-2 border-[#52aeb2] text-[#52aeb2] py-3 rounded-xl font-bold hover:bg-[#52aeb2] hover:text-white transition-colors">Ver contenido</button>
                        </div>

                        {/* Pack 2 - Featured */}
                        <div className="bg-[#2f4860] text-white rounded-2xl p-8 shadow-2xl scale-105 relative z-10">
                            <div className="absolute top-0 right-0 bg-[#ea7048] text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl">POPULAR</div>
                            <h3 className="text-2xl font-bold mb-2">Pack Oficina BIM</h3>
                            <p className="text-gray-300 mb-6 text-sm">Estandarización profesional.</p>
                            <div className="text-4xl font-extrabold text-[#ea7048] mb-6">$49</div>
                            <ul className="space-y-3 mb-8 text-gray-300 text-sm">
                                <li className="flex gap-2"><CheckCircle size={16} className="text-[#ea7048]" /> Plantilla Máster Pro</li>
                                <li className="flex gap-2"><CheckCircle size={16} className="text-[#ea7048]" /> Librería Detalles 2D</li>
                                <li className="flex gap-2"><CheckCircle size={16} className="text-[#ea7048]" /> Script Automatización</li>
                                <li className="flex gap-2"><CheckCircle size={16} className="text-[#ea7048]" /> Manual BIM (BEP)</li>
                            </ul>
                            <button className="w-full bg-[#ea7048] text-white py-3 rounded-xl font-bold hover:bg-[#d15d36] transition-colors shadow-lg">Comprar Pack</button>
                        </div>

                        {/* Pack 3 */}
                        <div className="border border-gray-200 rounded-2xl p-8 hover:border-[#52aeb2] hover:shadow-xl transition-all">
                            <h3 className="text-2xl font-bold text-[#2f4860] mb-2">Pack MEP</h3>
                            <p className="text-gray-400 mb-6 text-sm">Instalaciones detalladas.</p>
                            <div className="text-4xl font-extrabold text-[#52aeb2] mb-6">$39</div>
                            <ul className="space-y-3 mb-8 text-gray-600 text-sm">
                                <li className="flex gap-2"><CheckCircle size={16} className="text-[#52aeb2]" /> Plantilla MEP Configurada</li>
                                <li className="flex gap-2"><CheckCircle size={16} className="text-[#52aeb2]" /> Familias de Uniones (Fittings)</li>
                                <li className="flex gap-2"><CheckCircle size={16} className="text-[#52aeb2]" /> Filtros de Sistemas</li>
                            </ul>
                            <button className="w-full border-2 border-[#52aeb2] text-[#52aeb2] py-3 rounded-xl font-bold hover:bg-[#52aeb2] hover:text-white transition-colors">Ver contenido</button>
                        </div>
                    </div>
                </section>

                {/* F) FAQ */}
                <section className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-[#2f4860] text-center mb-8">Preguntas Frecuentes</h2>
                    <div className="space-y-4">
                        {[
                            { q: '¿Con qué versión de Revit son compatibles?', a: 'La mayoría de recursos están en Revit 2022 para garantizar compatibilidad con versiones recientes (2022, 2023, 2024+). Los scripts de Dynamo indican su versión específica.' },
                            { q: '¿Cómo instalo las familias?', a: 'Son archivos .rfa estándar. Puedes cargarlos desde la pestaña "Insertar" > "Cargar Familia" o simplemente arrastrando el archivo a tu proyecto.' },
                            { q: '¿Qué incluye el soporte Premium?', a: 'Acceso a un canal privado de Discord para dudas directas sobre la implementación de las plantillas y priorización en solicitud de nuevas familias.' }
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
                <h2 className="text-3xl font-bold mb-4">¿Buscas algo específico?</h2>
                <p className="text-gray-400 mb-8">Si no encuentras la familia o plantilla que necesitas, solicítala.</p>
                <div className="flex justify-center gap-4">
                    <button className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg transition-all">
                        <MessageCircle size={20} /> Solicitar por WhatsApp
                    </button>
                </div>
            </section>

        </div>
    );
}
