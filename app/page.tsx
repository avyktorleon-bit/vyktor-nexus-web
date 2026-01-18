"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { BrandHeader } from '@/components/layout/BrandHeader';
import { SoftwareCarousel } from '@/components/sections/SoftwareCarousel';
import { ContentHub } from '@/components/sections/ContentHub';
import {
    PlayCircleOutlined,
    FileZipOutlined,
    RobotOutlined,
    WhatsAppOutlined
} from '@ant-design/icons';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function HomePage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const faqs = [
        {
            q: "¿En qué puede ayudarte este espacio?",
            a: "Te ayuda a aprender, optimizar y aplicar herramientas digitales e IA en arquitectura e ingeniería, para trabajar mejor y con criterios reales de proyecto."
        },
        {
            q: "¿Qué tipo de contenido y recursos encontrarás aquí?",
            a: "Tutoriales prácticos, recursos descargables y herramientas de IA (prompts) para AutoCAD, Revit, BIM, planos, modelado, presentación y gestión técnica de proyectos."
        },
        {
            q: "¿Ofrecen servicios de ingeniería y arquitectura?",
            a: "Sí. Además del contenido digital, también se brindan servicios profesionales como elaboración de expedientes técnicos de edificaciones, desarrollo de planos y apoyo técnico en proyectos reales."
        }
    ];
    return (
        <div className="min-h-screen bg-[#dde8f4] font-sans">
            <BrandHeader />

            <main className="py-8 space-y-20">

                {/* 1. HERO FUSIONADO (Integración Digital + ¿Qué necesitas hoy?) */}
                <section className="container mx-auto px-4">
                    <div className="relative bg-[#0a0f18] rounded-[2rem] p-8 md:p-12 text-white shadow-2xl overflow-hidden flex flex-col items-center">
                        {/* Background Abstract Elements */}
                        <div className="absolute inset-0 z-0">
                            <div className="absolute inset-0 opacity-10"
                                style={{
                                    backgroundImage: 'linear-gradient(#52aeb2 1px, transparent 1px), linear-gradient(90deg, #52aeb2 1px, transparent 1px)',
                                    backgroundSize: '50px 50px',
                                    maskImage: 'radial-gradient(circle at 85% 50%, black, transparent 70%)'
                                }}>
                            </div>
                            <div className="absolute inset-0"
                                style={{
                                    background: 'radial-gradient(circle at 80% 20%, rgba(234, 112, 72, 0.15) 0%, transparent 50%)'
                                }}>
                            </div>
                            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#52aeb2] opacity-10 blur-[100px] animate-pulse"></div>
                        </div>

                        <div className="relative z-10 w-full flex flex-col items-center gap-6 md:gap-8">
                            {/* Centered Tagline Row */}
                            <div className="w-full text-center">
                                <h2 className="text-[#ea7048] font-bold tracking-[0.3em] text-lg md:text-xl uppercase">
                                    Ingeniería + Arquitectura + Inteligencia Artificial
                                </h2>
                            </div>

                            {/* Main Title & Message — Reference Image Layout */}
                            <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 max-w-7xl mx-auto">
                                <div className="lg:w-auto text-center lg:text-right">
                                    <h1 className="text-[36px] md:text-[62px] font-extrabold leading-[1] mb-0 inline-block align-middle">
                                        Integración<br />Digital
                                    </h1>
                                </div>

                                {/* Vertical Separator (Desktop only) */}
                                <div className="hidden lg:block w-[2px] h-24 bg-white/20 self-center"></div>

                                <div className="lg:max-w-xl text-center lg:text-left">
                                    <span className="block text-[24px] md:text-[42px] bg-gradient-to-r from-[#ea7048] to-[#f59e0b] bg-clip-text text-transparent italic leading-[1.1] font-extrabold">
                                        Dibujo técnico, modelado e IA aplicada a proyectos de ingeniería
                                    </span>
                                </div>
                            </div>

                            {/* HUB SELECTION (Integrated inside Hero) */}
                            <div className="w-full mt-6 pt-8 border-t border-white/10">
                                <div className="text-center mb-6">
                                    <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-1">¿Qué necesitas hoy?</h2>
                                    <p className="text-sm text-gray-400">Elige tu camino y empieza ahora.</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                                    {/* TARJETA 1 — Aprender */}
                                    <div className="bg-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/10 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full">
                                        <div className="flex items-start gap-4 mb-3">
                                            <div className="w-12 h-12 flex-shrink-0 bg-[#52aeb2]/20 rounded-xl flex items-center justify-center text-2xl text-[#52aeb2] group-hover:scale-110 transition-transform">
                                                <PlayCircleOutlined />
                                            </div>
                                            <div>
                                                <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">Aprender</h3>
                                                <span className="block text-[11px] font-bold text-[#52aeb2] uppercase tracking-[0.2em] mt-1">(TUTORIALES)</span>
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                                            Domina flujos reales en Revit, AutoCAD y BIM para proyectos profesionales.
                                        </p>
                                        <div className="mt-auto">
                                            <Link href="/tutoriales" className="inline-flex items-center gap-2 font-bold text-[#52aeb2] text-base group-hover:gap-3 transition-all hover:text-white">
                                                Ver tutoriales <span>→</span>
                                            </Link>
                                        </div>
                                    </div>

                                    {/* TARJETA 2 — Descargar */}
                                    <div className="bg-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/10 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full">
                                        <div className="flex items-start gap-4 mb-3">
                                            <div className="w-12 h-12 flex-shrink-0 bg-[#ea7048]/20 rounded-xl flex items-center justify-center text-2xl text-[#ea7048] group-hover:scale-110 transition-transform">
                                                <FileZipOutlined />
                                            </div>
                                            <div>
                                                <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">Descargar</h3>
                                                <span className="block text-[11px] font-bold text-[#ea7048] uppercase tracking-[0.2em] mt-1">(RECURSOS)</span>
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                                            Plantillas, familias, bloques, checklists y formatos listos para usar.
                                        </p>
                                        <div className="mt-auto">
                                            <Link href="/recursos" className="inline-flex items-center gap-2 font-bold text-[#ea7048] text-base group-hover:gap-3 transition-all hover:text-white">
                                                Ir a recursos <span>→</span>
                                            </Link>
                                        </div>
                                    </div>

                                    {/* TARJETA 3 — Aplicar IA */}
                                    <div className="bg-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/10 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full">
                                        <div className="flex items-start gap-4 mb-3">
                                            <div className="w-12 h-12 flex-shrink-0 bg-[#f59e0b]/20 rounded-xl flex items-center justify-center text-2xl text-[#f59e0b] group-hover:scale-110 transition-transform">
                                                <RobotOutlined />
                                            </div>
                                            <div>
                                                <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">Aplicar IA</h3>
                                                <span className="block text-[11px] font-bold text-[#f59e0b] uppercase tracking-[0.2em] mt-1">(PROMPTS + IA)</span>
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                                            Prompts probados para acelerar planos, BIM y presentación de proyectos.
                                        </p>
                                        <div className="mt-auto">
                                            <Link href="/ia" className="inline-flex items-center gap-2 font-bold text-[#f59e0b] text-base group-hover:gap-3 transition-all hover:text-white">
                                                Ver Biblioteca de Prompts <span>→</span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                {/* Final Description Section — Centered at Footer position */}
                                <div className="w-full mt-12 text-center">
                                    <p className="text-sm md:text-base text-gray-400 leading-normal max-w-4xl mx-auto opacity-70">
                                        Te ayudo a simplificar proyectos de ingeniería y arquitectura integrando herramientas digitales y automatización con IA en flujos de trabajo claros, eficientes y profesionales.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. NOTICIAS DESTACADAS */}
                <section className="container mx-auto px-4">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-3xl font-bold border-l-4 border-[#ea7048] pl-4 text-[#2f4860]">Noticias Destacadas</h2>
                        <a href="/noticias" className="text-[#ea7048] font-bold hover:underline text-lg">Ver todas →</a>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        <article className="lg:col-span-2 bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col h-full">
                            <Link href="/noticias/arquitectos-uni-ganan-concurso-mundial" className="flex flex-col h-full text-decoration-none">
                                <div className="h-72 bg-[#e0e7ff] overflow-hidden">
                                    <img src="/assets/img/news-uni-2026.png" alt="Arquitectos UNI 2026" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <div className="p-8 flex-grow flex flex-col">
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        <span className="bg-[#52aeb2] text-white px-3 py-1 rounded text-xs uppercase font-bold tracking-wider">Arquitectura</span>
                                        <span className="ml-auto text-gray-400 text-sm font-medium self-center">13 Ene 2026</span>
                                    </div>
                                    <h3 className="text-3xl font-bold mt-2 mb-4 leading-tight group-hover:text-[#ea7048] transition-colors text-[#2f4860]">
                                        Arquitectos de la UNI ganan concurso mundial con proyecto para reducir el tráfico en SJL
                                    </h3>
                                    <p className="text-gray-600 text-lg mb-6 line-clamp-2">
                                        Un equipo de la Universidad Nacional de Ingeniería triunfa en el concurso de la AECID con una propuesta de urbanismo escalable para el distrito más poblado de Lima.
                                    </p>
                                    <div className="mt-auto">
                                        <span className="text-[#ea7048] font-bold text-lg flex items-center gap-2 group-hover:gap-3 transition-all">Leer nota completa &rarr;</span>
                                    </div>
                                </div>
                            </Link>
                        </article>
                        <div className="bg-white rounded-xl p-8 shadow-sm h-full flex flex-col">
                            <h3 className="text-xl font-bold text-[#ea7048] uppercase tracking-wider mb-6 pb-2 border-b-2 border-gray-50">Más Noticias</h3>
                            <div className="space-y-6">
                                {[
                                    { title: "Bono de Protección de Viviendas Vulnerables 2026", tag: "Ingeniería", href: "/noticias/bono-proteccion-vivienda-2026" },
                                    { title: "Plan Nacional de Infraestructura 2026-2031", tag: "Infraestructura", href: "/noticias/proyectos-infraestructura-peru-2026-2031" },
                                    { title: "IA Generativa: Tendencias AEC para 2026", tag: "Tecnología", href: "/noticias/ia-aec-tendencias-2026" },
                                    { title: "BIM y IA en proyectos mineros 2026", tag: "Tecnología", href: "/noticias/stantec-diseno-electrico-mineria-bim" },
                                ].map((news, i) => (
                                    <Link key={i} href={news.href} className="block group">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="bg-[#ea7048]/10 text-[#ea7048] px-2 py-0.5 rounded text-[10px] uppercase font-bold">{news.tag}</span>
                                        </div>
                                        <h4 className="font-bold text-[#2f4860] group-hover:text-[#ea7048] transition-colors leading-snug">{news.title}</h4>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. SECCIÓN DE PROGRAMAS / SOFTWARE */}
                <SoftwareCarousel />

                {/* 4. REVIT & 5. AUTOCAD */}
                <div className="space-y-12">
                    <ContentHub
                        title="REVIT"
                        subtitle="Últimos tutoriales y recursos para Revit"
                        videos={[
                            {
                                title: "Optimización de Flujos",
                                description: "Configura plantillas profesionales para ganar tiempo en tus entregas.",
                                category: "REVIT",
                                videoUrl: "https://www.youtube.com/embed/videoseries?list=PLx78p6x0yqC_W7_lE_1_r_u_o_o_q_e_1"
                            },
                            {
                                title: "Familias Avanzadas",
                                description: "Modelado de componentes complejos y adaptativos.",
                                category: "REVIT",
                                isComingSoon: true
                            }
                        ]}
                        navLinks={[
                            { title: "Tutoriales de Revit", href: "/tutoriales-revit", icon: "🏗️" },
                            { title: "Recursos", href: "/recursos-revit", icon: "📥" },
                            { title: "Biblioteca de Prompts", href: "/ia-prompts-revit", icon: "🤖" },
                        ]}
                    />

                    <ContentHub
                        title="AUTOCAD"
                        subtitle="Domina el dibujo 2D y la documentación con AutoCAD"
                        videos={[
                            {
                                title: "Interfaz y Comandos Básicos",
                                description: "Domina los fundamentos para empezar a dibujar con precisión.",
                                category: "AUTOCAD",
                                isComingSoon: true
                            },
                            {
                                title: "Bloques Dinámicos y Atributos",
                                description: "Automatiza tus planos con componentes inteligentes.",
                                category: "AUTOCAD",
                                isComingSoon: true
                            }
                        ]}
                        navLinks={[
                            { title: "Tutoriales de AutoCAD", href: "/tutoriales-autocad", icon: "📐" },
                            { title: "Recursos", href: "/recursos-autocad", icon: "📥" },
                            { title: "Biblioteca de Prompts", href: "/ia-prompts-autocad", icon: "🤖" },
                        ]}
                    />
                </div>

                {/* 5. SECCIÓN DE PREGUNTAS FRECUENTES (FAQ) */}
                <section className="container mx-auto px-4 py-4">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold text-[#2f4860] text-center mb-6">Preguntas Frecuentes</h2>
                        <div className="space-y-4">
                            {faqs.map((faq, i) => (
                                <div
                                    key={i}
                                    className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 transition-all duration-300"
                                >
                                    <button
                                        onClick={() => toggleFaq(i)}
                                        className="w-full px-8 py-6 flex items-center justify-between text-left group"
                                    >
                                        <span className={`text-lg font-bold transition-colors duration-300 ${openFaq === i ? 'text-[#ea7048]' : 'text-[#2f4860]'}`}>
                                            {faq.q}
                                        </span>
                                        <div className={`p-2 rounded-xl transition-all duration-300 ${openFaq === i ? 'bg-[#ea7048]/10 text-[#ea7048] rotate-180' : 'bg-gray-50 text-gray-400'}`}>
                                            <ChevronDown size={20} />
                                        </div>
                                    </button>

                                    <div
                                        className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                                    >
                                        <div className="px-8 pb-8 pt-2">
                                            <div className="pl-6 border-l-2 border-[#52aeb2] text-gray-600 leading-relaxed text-base">
                                                {faq.a}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            {/* 6. SERVICIOS CTA + FOOTER (Bloque de Cierre Unificado FULL WIDTH) */}
            <footer className="bg-[#2f4860] py-8 md:py-12 text-center relative overflow-hidden">
                {/* Subtle Background Detail */}
                <div className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{
                        backgroundImage: 'radial-gradient(circle at 50% -20%, rgba(82, 174, 178, 0.15) 0%, transparent 70%)'
                    }}>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-white leading-tight max-w-4xl mx-auto">
                        ¿Necesitas apoyo profesional para tu proyecto?
                    </h2>
                    <p className="text-gray-300 text-base md:text-xl mb-8 max-w-3xl mx-auto leading-relaxed opacity-90 text-center">
                        Ofrezco servicios de arquitectura e ingeniería, desde encargos específicos hasta el desarrollo y evaluación de soluciones técnicas, con el respaldo de un equipo especializado según las necesidades de tu proyecto.
                    </p>

                    <a
                        href="https://wa.me/519XXXXXXXX"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 bg-[#2ecc71] hover:bg-[#27ae60] text-white px-10 md:px-14 py-4 md:py-5 rounded-xl font-bold text-lg md:text-xl transition-all transform hover:-translate-y-1 hover:shadow-xl hover:shadow-[#2ecc71]/20 group"
                    >
                        <WhatsAppOutlined className="text-2xl md:text-3xl" />
                        Contactar por WhatsApp
                    </a>

                    {/* Integrated Copyright Text */}
                    <div className="mt-10 pt-6 border-t border-white/10">
                        <p className="text-sm md:text-base text-white/50 font-medium tracking-widest uppercase">
                            VyktorNexus - 2026
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
