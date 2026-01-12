import Link from 'next/link';
import { BrandHeader } from '@/components/layout/BrandHeader';

export default function AutoCADTutorialsPage() {
    return (
        <div className="min-h-screen bg-[#dde8f4] font-sans">
            <BrandHeader />
            <main className="container mx-auto px-4 py-20 text-center">
                <h1 className="text-4xl font-bold text-[#2f4860] mb-4 uppercase">Tutoriales de AutoCAD</h1>
                <p className="text-xl text-[#83a0b5] mb-8">Domina el dibujo 2D y 3D con las mejores técnicas profesionales.</p>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto text-left">
                    {/* Main Video Card */}
                    <div className="lg:col-span-2 bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                        <div className="aspect-video w-full bg-black">
                            <iframe
                                src="https://www.youtube.com/embed/videoseries?list=PLx0sYbCqOb8TBPRdmBHs5Iftvv9TPboYG"
                                title="AutoCAD Tutorials"
                                className="w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                        <div className="p-6">
                            <h2 className="text-2xl font-bold text-[#2f4860] mb-2">Curso Completo de AutoCAD</h2>
                            <p className="text-gray-500">Domina los comandos y flujos de trabajo esenciales.</p>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-[#fef9c3] rounded-2xl p-6 border border-[#fde047]">
                            <h3 className="text-lg font-bold text-[#2f4860] mb-2">Herramientas CAD</h3>
                            <ul className="space-y-3">
                                <li>
                                    <Link href="/recursos-autocad" className="text-[#ea7048] font-bold hover:underline flex items-center gap-2">
                                        <span>📥</span> Bloques Dinámicos
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/ia-prompts-autocad" className="text-[#ea7048] font-bold hover:underline flex items-center gap-2">
                                        <span>🤖</span> Automatización con IA
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
