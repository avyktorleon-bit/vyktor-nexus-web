import Link from 'next/link';
import { BrandHeader } from '@/components/layout/BrandHeader';
import { PromptLibrary } from '@/components/sections/PromptLibrary';
import { SoftwareCarousel } from '@/components/sections/SoftwareCarousel';
import { ContentHub } from '@/components/sections/ContentHub';
import {
    BookOutlined,
    ToolOutlined,
    BulbOutlined
} from '@ant-design/icons';

export default function HomePage() {
    return (
        <div className="min-h-screen bg-[#dde8f4] font-sans">
            <BrandHeader />

            <main className="py-8 space-y-20">

                {/* REDESIGNED HERO SECTION (Dual Segment + Dark Mode) */}
                <section className="container mx-auto px-4">
                    <div className="relative bg-[#0a0f18] rounded-[2rem] p-10 md:p-20 text-white shadow-2xl overflow-hidden min-h-[70vh] flex items-center">
                        {/* Background Abstract Elements */}
                        <div className="absolute inset-0 z-0">
                            {/* Blueprint Grid Effect */}
                            <div className="absolute inset-0 opacity-10"
                                style={{
                                    backgroundImage: 'linear-gradient(#52aeb2 1px, transparent 1px), linear-gradient(90deg, #52aeb2 1px, transparent 1px)',
                                    backgroundSize: '50px 50px',
                                    maskImage: 'radial-gradient(circle at 85% 50%, black, transparent 70%)'
                                }}>
                            </div>
                            {/* IA Node Glow */}
                            <div className="absolute inset-0"
                                style={{
                                    background: 'radial-gradient(circle at 80% 20%, rgba(234, 112, 72, 0.15) 0%, transparent 50%)'
                                }}>
                            </div>
                            {/* Bottom Corner Accent */}
                            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#52aeb2] opacity-10 blur-[100px] animate-pulse"></div>
                        </div>

                        <div className="relative z-10 w-full flex flex-col items-center gap-12">
                            {/* Centered Tagline Row */}
                            <div className="w-full text-center">
                                <h2 className="text-[#ea7048] font-bold tracking-[0.3em] text-lg md:text-xl uppercase whitespace-nowrap overflow-hidden text-ellipsis">
                                    Ingeniería + Arquitectura + Inteligencia Artificial
                                </h2>
                            </div>

                            {/* Main Content Row */}
                            <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-12">
                                <div className="max-w-2xl text-left">
                                    <h1 className="text-[25px] md:text-[62px] font-extrabold mb-8 leading-[1.1]">
                                        Integración Digital
                                        <span className="block mt-2 text-[20px] md:text-[48px] bg-gradient-to-r from-[#ea7048] to-[#f59e0b] bg-clip-text text-transparent italic leading-[1.2]">
                                            Dibujo técnico, modelado e IA aplicada a proyectos de ingeniería
                                        </span>
                                    </h1>

                                    <p className="text-xl md:text-2xl text-gray-400 mb-0 leading-relaxed">
                                        Te ayudo a simplificar la forma de crear proyectos de ingeniería y arquitectura.
                                        Aprende conmigo a integrar herramientas digitales y automatización con IA en proyectos reales, usando flujos de trabajo claros, eficientes y profesionales.
                                    </p>
                                </div>

                                <div className="flex flex-col gap-5 w-full lg:max-w-md">
                                    {/* TUTORIALES */}
                                    <Link href="/tutoriales"
                                        className="flex items-center gap-5 p-5 md:p-6 bg-[#52aeb2]/10 border border-[#52aeb2]/20 rounded-2xl hover:bg-[#52aeb2]/20 transition-all group backdrop-blur-sm">
                                        <div className="w-12 h-12 flex items-center justify-center bg-[#52aeb2]/20 rounded-xl text-2xl text-[#52aeb2] group-hover:scale-110 transition-transform">
                                            <BookOutlined />
                                        </div>
                                        <div className="text-left">
                                            <span className="block text-[10px] uppercase tracking-widest text-[#52aeb2] font-bold mb-1">Aprendizaje</span>
                                            <span className="block text-md md:text-lg font-bold text-white mb-0.5">Tutoriales guiados</span>
                                            <span className="block text-xs text-gray-400">Dibujo técnico y modelado paso a paso</span>
                                        </div>
                                    </Link>

                                    {/* RECURSOS */}
                                    <Link href="/recursos"
                                        className="flex items-center gap-5 p-5 md:p-6 bg-[#3b82f6]/10 border border-[#3b82f6]/20 rounded-2xl hover:bg-[#3b82f6]/20 transition-all group backdrop-blur-sm">
                                        <div className="w-12 h-12 flex items-center justify-center bg-[#3b82f6]/20 rounded-xl text-2xl text-[#3b82f6] group-hover:scale-110 transition-transform">
                                            <ToolOutlined />
                                        </div>
                                        <div className="text-left">
                                            <span className="block text-[10px] uppercase tracking-widest text-[#3b82f6] font-bold mb-1">Soporte</span>
                                            <span className="block text-md md:text-lg font-bold text-white mb-0.5">Recursos técnicos</span>
                                            <span className="block text-xs text-gray-400">Plantillas y material para proyectos reales</span>
                                        </div>
                                    </Link>

                                    {/* IA */}
                                    <Link href="/ia"
                                        className="flex items-center gap-5 p-5 md:p-6 bg-[#ea7048]/10 border border-[#ea7048]/20 rounded-2xl hover:bg-[#ea7048]/20 transition-all group backdrop-blur-sm">
                                        <div className="w-12 h-12 flex items-center justify-center bg-[#ea7048]/20 rounded-xl text-2xl text-[#ea7048] group-hover:scale-110 transition-transform">
                                            <BulbOutlined />
                                        </div>
                                        <div className="text-left">
                                            <span className="block text-[10px] uppercase tracking-widest text-[#ea7048] font-bold mb-1">Optimización</span>
                                            <span className="block text-md md:text-lg font-bold text-white mb-0.5">IA aplicada a proyectos</span>
                                            <span className="block text-xs text-gray-400">Automatización y flujos inteligentes</span>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* NEWS SECTION */}
                <section className="container mx-auto px-4">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-3xl font-bold border-l-4 border-[#ea7048] pl-4 text-[#2f4860]">Noticias Destacadas</h2>
                        <a href="/noticias" className="text-[#ea7048] font-bold hover:underline text-lg">Ver todas →</a>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        <article className="lg:col-span-2 bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col h-full">
                            <Link href="/noticias/arquitectos-uni-ganan-concurso-mundial" className="flex flex-col h-full text-decoration-none">
                                <div className="h-72 bg-[#e0e7ff] overflow-hidden">
                                    <img
                                        src="/assets/img/news-uni-2026.png"
                                        alt="Arquitectos UNI 2026"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-8 flex-grow flex flex-col">
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        <span className="bg-[#52aeb2] text-white px-3 py-1 rounded text-xs uppercase font-bold tracking-wider">Arquitectura</span>
                                        <span className="bg-gray-400 text-white px-3 py-1 rounded text-xs uppercase font-bold tracking-wider">Urbanismo</span>
                                        <span className="bg-gray-400 text-white px-3 py-1 rounded text-xs uppercase font-bold tracking-wider">SJL</span>
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
                                    { title: "Primera convocatoria del Bono de Protección de Viviendas Vulnerables en 2026", tag: "Ingeniería", tagColor: "#3b82f6", date: "12 Ene 2026", href: "/noticias/bono-proteccion-vivienda-2026" },
                                    { title: "MEF impulsa Plan Nacional de Infraestructura 2026-2031 con S/ 144 mil millones", tag: "Infraestructura", tagColor: "#ec4899", date: "10 Ene 2026", href: "/noticias/proyectos-infraestructura-peru-2026-2031" },
                                    { title: "IA Generativa y Gemelos Digitales: Las 6 tendencias del sector AEC para 2026", tag: "Tecnología", tagColor: "#ea7048", date: "08 Ene 2026", href: "/noticias/ia-aec-tendencias-2026" },
                                    { title: "Stantec consolida el uso de BIM y IA en proyectos mineros hacia el 2026", tag: "Tecnología", tagColor: "#ea7048", date: "07 Ene 2026", href: "/noticias/stantec-diseno-electrico-mineria-bim" },
                                ].map((news, i) => (
                                    <Link key={i} href={news.href} className="block group text-decoration-none">
                                        <div className="flex flex-wrap gap-2 mb-2">
                                            <span style={{ backgroundColor: i === 0 ? '#3b82f6' : i === 1 ? '#ec4899' : '#ea7048' }} className="text-white px-2 py-0.5 rounded-[4px] text-[10px] uppercase font-bold tracking-tight">{news.tag}</span>
                                            {i === 2 && <span className="bg-gray-400 text-white px-2 py-0.5 rounded-[4px] text-[10px] uppercase font-bold tracking-tight">IA</span>}
                                            {i === 3 && <span className="bg-gray-400 text-white px-2 py-0.5 rounded-[4px] text-[10px] uppercase font-bold tracking-tight">BIM</span>}
                                            <span className="ml-auto text-gray-400 text-[11px] self-center">{news.date}</span>
                                        </div>
                                        <h4 className="font-bold text-[#2f4860] group-hover:text-[#ea7048] transition-colors leading-snug">{news.title}</h4>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <SoftwareCarousel />

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

                <div className="container mx-auto px-4">
                    <PromptLibrary />
                </div>

                {/* START HERE PATHS */}
                <section className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold border-l-4 border-[#ea7048] pl-4 mb-8 text-[#2f4860]">Comienza Aquí</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { label: "Principiante", title: "Empieza desde cero", desc: "Fundamentos y primeros pasos en software BIM y CAD.", icon: "🌱" },
                            { label: "Intermedio", title: "Mejora tu flujo", desc: "Optimización, atajos y mejores prácticas para trabajar más rápido.", icon: "⚡" },
                            { label: "Avanzado", title: "Recursos Pro", desc: "Scripts, familias complejas y automatización con IA.", icon: "🚀" },
                            { label: "IA", title: "Google AI & Gemini", desc: "Aprende a usar Google AI para potenciar tu productividad en ingeniería.", icon: "🤖" },
                        ].map((p, i) => (
                            <div key={i} className="bg-gradient-to-br from-white to-[#f8fbfe] border border-[#e1eaf4] rounded-2xl p-8 relative hover:shadow-lg transition-all group">
                                <span className={`${p.label === 'IA' ? 'text-[#ea7048]' : 'text-[#52aeb2]'} text - sm font - bold uppercase tracking - wider mb - 2 block`}>{p.label}</span>
                                <h3 className="text-2xl font-bold mb-4 text-[#2f4860]">{p.title}</h3>
                                <p className="text-gray-500 mb-6">{p.desc}</p>
                                <a href={p.label === 'IA' ? '/ia' : '#'} className="text-[#ea7048] font-bold flex items-center gap-2 group-hover:gap-3 transition-all">Iniciar ruta →</a>
                            </div>
                        ))}
                    </div>
                </section>

                {/* FOOTER CTA */}
                <div className="container mx-auto px-4">
                    <section className="bg-white rounded-2xl p-16 text-center shadow-sm border border-gray-50">
                        <h2 className="text-4xl font-bold mb-4 text-[#2f4860]">Lleva tus proyectos al siguiente nivel</h2>
                        <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">Accede a herramientas y conocimientos curados por expertos en el sector de la construcción.</p>
                        <div className="flex flex-col sm:flex-row justify-center gap-5">
                            <Link href="/tutoriales" className="bg-[#ea7048] text-white px-10 py-4 rounded-xl font-bold hover:bg-[#d15d36] transition-all transform hover:-translate-y-1 shadow-lg shadow-[#ea7048]/20 flex items-center justify-center">
                                Explorar tutoriales
                            </Link>
                            <Link href="/recursos" className="border-2 border-[#2f4860] text-[#2f4860] px-10 py-4 rounded-xl font-bold hover:bg-[#2f4860] hover:text-white transition-all transform hover:-translate-y-1 flex items-center justify-center">
                                Ir a recursos
                            </Link>
                        </div>
                    </section>
                </div>

            </main>

            <footer className="bg-[#2f4860] text-white py-12 text-center mt-16">
                <p className="text-lg opacity-80">&copy; 2024 VYKTOR NEXUS - Innovación en Construcción</p>
            </footer>
        </div >
    );
}
