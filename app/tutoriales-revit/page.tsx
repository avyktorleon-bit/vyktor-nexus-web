import Link from 'next/link';
import { BrandHeader } from '@/components/layout/BrandHeader';

export default function RevitTutorialsPage() {
    return (
        <div className="min-h-screen bg-[#dde8f4] font-sans">
            <BrandHeader />
            <main className="container mx-auto px-4 py-20 text-center">
                <h1 className="text-4xl font-bold text-[#2f4860] mb-4 uppercase">Tutoriales de Revit</h1>
                <p className="text-xl text-[#83a0b5] mb-8">Aprende BIM, modelado paramétrico y gestión de proyectos con Revit.</p>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto text-left">
                    {/* Main Video Card */}
                    <div className="lg:col-span-2 bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                        <div className="aspect-video w-full bg-black">
                            <iframe
                                src="https://www.youtube.com/embed/videoseries?list=PLx0sYbCqOb8TBPRdmBHs5Iftvv9TPboYG"
                                title="Revit Tutorials"
                                className="w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                        <div className="p-6">
                            <h2 className="text-2xl font-bold text-[#2f4860] mb-2">Tutoriales Completos de Revit</h2>
                            <p className="text-gray-500">Aprende desde cero con nuestra lista de reproducción oficial.</p>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-[#e0e7ff] rounded-2xl p-6 border border-[#c7d2fe]">
                            <h3 className="text-lg font-bold text-[#2f4860] mb-2">Recursos Relacionados</h3>
                            <ul className="space-y-3">
                                <li>
                                    <Link href="/recursos-revit" className="text-[#ea7048] font-bold hover:underline flex items-center gap-2">
                                        <span>📥</span> Descargar Plantillas
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/ia-prompts-revit" className="text-[#ea7048] font-bold hover:underline flex items-center gap-2">
                                        <span>🤖</span> Prompts de IA para Revit
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
