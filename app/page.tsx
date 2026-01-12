import Link from 'next/link';
import { BrandHeader } from '@/components/layout/BrandHeader';
import { PromptLibrary } from '@/components/sections/PromptLibrary';
import { SoftwareCarousel } from '@/components/sections/SoftwareCarousel';
import { ContentHub } from '@/components/sections/ContentHub';

export default function HomePage() {
    return (
        <div className="min-h-screen bg-[#dde8f4] font-sans">
            <BrandHeader />

            <main className="container mx-auto px-4 py-8">

                {/* EXPERTISE HERO SECTION (New) */}
                <section className="mb-20 text-center">
                    <div className="bg-[#2f4860] rounded-3xl p-10 md:p-16 text-white shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                            <div className="absolute right-0 top-0 w-64 h-64 bg-[#ea7048] rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                            <div className="absolute left-0 bottom-0 w-64 h-64 bg-[#52aeb2] rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
                        </div>

                        <div className="relative z-10 max-w-3xl mx-auto">
                            <h2 className="text-sm font-bold tracking-[0.2em] text-[#ea7048] mb-4 uppercase">Ingeniería + Tecnología + IA</h2>
                            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                                Domina el futuro de la <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ea7048] to-[#f59e0b]">Construcción</span>
                            </h1>
                            <p className="text-xl text-gray-300 mb-10 leading-relaxed">
                                Uniendo la precisión de <strong>AutoCAD</strong> y <strong>Revit</strong> con el poder de la <strong>Inteligencia Artificial</strong> para ingenieros y arquitectos.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                                <Link href="/tutoriales-revit" className="bg-white/10 backdrop-blur-sm border border-white/10 p-6 rounded-xl hover:bg-white/20 transition-all group">
                                    <span className="text-3xl mb-3 block">🏗️</span>
                                    <h3 className="font-bold text-lg mb-1 group-hover:text-[#ea7048] transition-colors">BIM Specialist</h3>
                                    <p className="text-sm text-gray-400">Modelado avanzado y gestión paramétrica.</p>
                                </Link>
                                <Link href="/ia" className="bg-white/10 backdrop-blur-sm border border-white/10 p-6 rounded-xl hover:bg-white/20 transition-all group">
                                    <span className="text-3xl mb-3 block">🤖</span>
                                    <h3 className="font-bold text-lg mb-1 group-hover:text-[#ea7048] transition-colors">IA Workflow</h3>
                                    <p className="text-sm text-gray-400">Automatización y generación con IA.</p>
                                </Link>
                                <Link href="/tutoriales-autocad" className="bg-white/10 backdrop-blur-sm border border-white/10 p-6 rounded-xl hover:bg-white/20 transition-all group">
                                    <span className="text-3xl mb-3 block">📐</span>
                                    <h3 className="font-bold text-lg mb-1 group-hover:text-[#ea7048] transition-colors">CAD Master</h3>
                                    <p className="text-sm text-gray-400">Dibujo técnico y documentación precisa.</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* NEWS SECTION */}
                <section className="mb-12">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-3xl font-bold border-l-4 border-[#ea7048] pl-4">Noticias Destacadas</h2>
                        <a href="/noticias" className="text-[#ea7048] font-bold hover:underline text-lg">Ver todas →</a>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
                        <article className="lg:col-span-2 bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                            <a href="/noticias/aeropuerto" className="block">
                                <div className="h-72 bg-[#e0e7ff] flex items-center justify-center text-8xl grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all">✈️</div>
                                <div className="p-8">
                                    <div className="flex gap-4 items-center mb-4">
                                        <span className="bg-[#ec4899] text-white px-3 py-1 rounded text-xs uppercase font-bold tracking-wider">Infraestructura</span>
                                        <span className="text-gray-400 text-sm font-medium">05 Ene 2026</span>
                                    </div>
                                    <h3 className="text-3xl font-bold mt-2 mb-4 leading-tight group-hover:text-[#ea7048] transition-colors">
                                        Nuevo Aeropuerto Jorge Chávez: Balance tras 6 meses operando al 100%
                                    </h3>
                                    <p className="text-gray-600 text-lg mb-6 line-clamp-2">
                                        La nueva terminal de pasajeros, inaugurada en junio de 2025, ha transformado la conectividad en Sudamérica.
                                    </p>
                                    <span className="text-[#ea7048] font-bold text-lg flex items-center gap-2 group-hover:gap-3 transition-all">Leer nota completa →</span>
                                </div>
                            </a>
                        </article>

                        <div className="bg-white rounded-xl p-8 shadow-sm">
                            <h3 className="text-xl font-bold text-[#ea7048] uppercase tracking-wider mb-6 pb-2 border-b-2 border-gray-50">Más Noticias</h3>
                            <div className="space-y-6">
                                {[
                                    { title: "Puerto de Chancay: Segundo puerto más activo del Perú", tag: "Comercio", tagColor: "#64748b", date: "08 Ene 2026", href: "/noticias/chancay" },
                                    { title: "Avances Línea 2 del Metro: Nuevas estaciones en el Callao", tag: "Transporte", tagColor: "#f59e0b", date: "03 Ene 2026", href: "/noticias/metro-lima" },
                                    { title: "Mortenson construirá estadio femenino de $225M en Denver", tag: "Internacional", tagColor: "#f59e0b", date: "09 Ene 2026", href: "/noticias/estadio-denver" },
                                ].map((news, i) => (
                                    <a key={i} href={news.href} className="block group">
                                        <div className="flex gap-4 items-center mb-2">
                                            <span style={{ backgroundColor: news.tagColor }} className="text-white px-2 py-0.5 rounded-[4px] text-[10px] uppercase font-bold tracking-tight">{news.tag}</span>
                                            <span className="text-gray-400 text-[11px]">{news.date}</span>
                                        </div>
                                        <h4 className="font-bold text-[#2f4860] group-hover:text-[#ea7048] transition-colors leading-snug">{news.title}</h4>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <SoftwareCarousel />

                <div className="space-y-12 mt-12">
                    <ContentHub
                        title="REVIT"
                        subtitle="Latest tutorials and resources for Revit"
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
                            { title: "Revit Tutorials", href: "/tutoriales-revit", icon: "🏗️" },
                            { title: "Guides & Templates", href: "/tutoriales-productividad", icon: "📝" },
                            { title: "Resources", href: "/recursos-revit", icon: "📥" },
                            { title: "Prompt Library", href: "/ia-prompts-revit", icon: "🤖" },
                        ]}
                    />

                    <ContentHub
                        title="AUTOCAD"
                        subtitle="Master 2D drafting and documentation with AutoCAD"
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
                            { title: "AutoCAD Tutorials", href: "/tutoriales-autocad", icon: "📐" },
                            { title: "Guides & Templates", href: "/tutoriales-productividad", icon: "📝" },
                            { title: "Resources", href: "/recursos-autocad", icon: "📥" },
                            { title: "Prompt Library", href: "/ia-prompts-autocad", icon: "🤖" },
                        ]}
                    />
                </div>

                <PromptLibrary />

                {/* START HERE PATHS */}
                <section className="mt-16">
                    <h2 className="text-3xl font-bold border-l-4 border-[#ea7048] pl-4 mb-8">Comienza Aquí</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { label: "Principiante", title: "Empieza desde cero", desc: "Fundamentos y primeros pasos en software BIM y CAD.", icon: "🌱" },
                            { label: "Intermedio", title: "Mejora tu flujo", desc: "Optimización, atajos y mejores prácticas para trabajar más rápido.", icon: "⚡" },
                            { label: "Avanzado", title: "Recursos Pro", desc: "Scripts, familias complejas y automatización con IA.", icon: "🚀" },
                            { label: "IA", title: "Google AI & Gemini", desc: "Aprende a usar Google AI para potenciar tu productividad en ingeniería.", icon: "🤖" },
                        ].map((p, i) => (
                            <div key={i} className="bg-gradient-to-br from-white to-[#f8fbfe] border border-[#e1eaf4] rounded-2xl p-8 relative hover:shadow-lg transition-all group">
                                <span className={`${p.label === 'IA' ? 'text-[#ea7048]' : 'text-[#52aeb2]'} text-sm font-bold uppercase tracking-wider mb-2 block`}>{p.label}</span>
                                <h3 className="text-2xl font-bold mb-4 text-[#2f4860]">{p.title}</h3>
                                <p className="text-gray-500 mb-6">{p.desc}</p>
                                <a href={p.label === 'IA' ? '/ia' : '#'} className="text-[#ea7048] font-bold flex items-center gap-2 group-hover:gap-3 transition-all">Iniciar ruta →</a>
                            </div>
                        ))}
                    </div>
                </section>

                {/* FOOTER CTA */}
                <section className="bg-white rounded-2xl p-16 text-center mt-16 shadow-sm border border-gray-50">
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

            </main>

            <footer className="bg-[#2f4860] text-white py-12 text-center mt-16">
                <p className="text-lg opacity-80">&copy; 2024 VYKTOR NEXUS - Innovación en Construcción</p>
            </footer>
        </div>
    );
}
