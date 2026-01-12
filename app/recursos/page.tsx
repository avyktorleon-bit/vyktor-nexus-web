import Link from 'next/link';
import { BrandHeader } from '@/components/layout/BrandHeader';

export default function RecursosPage() {
    return (
        <div className="min-h-screen bg-white font-sans">
            <BrandHeader />
            <main className="container mx-auto px-4 py-20">
                <div className="text-center max-w-3xl mx-auto">
                    <h1 className="text-4xl font-bold text-[#2f4860] mb-6">Centro de Recursos</h1>
                    <p className="text-xl text-gray-500 mb-12">Herramientas, descargas y material de apoyo para tu crecimiento profesional.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {/* Revit Card */}
                    <div className="bg-[#f0f9ff] rounded-2xl p-8 border border-[#e0f2fe] hover:shadow-lg transition-all">
                        <span className="text-4xl mb-4 block">🏗️</span>
                        <h3 className="text-2xl font-bold text-[#2f4860] mb-2">Revit & BIM</h3>
                        <p className="text-gray-600 mb-6">Plantillas, familias y scripts de Dynamo.</p>
                        <Link href="/recursos-revit" className="text-[#0ea5e9] font-bold hover:underline">Ir a descargas →</Link>
                    </div>

                    {/* AutoCAD Card */}
                    <div className="bg-[#fffbeb] rounded-2xl p-8 border border-[#fef3c7] hover:shadow-lg transition-all">
                        <span className="text-4xl mb-4 block">📐</span>
                        <h3 className="text-2xl font-bold text-[#2f4860] mb-2">AutoCAD</h3>
                        <p className="text-gray-600 mb-6">Librerías de bloques, lisp y patrones de sombreado.</p>
                        <Link href="/recursos-autocad" className="text-[#d97706] font-bold hover:underline">Ir a descargas →</Link>
                    </div>

                    {/* Formatos Card */}
                    <div className="bg-[#f3f4f6] rounded-2xl p-8 border border-[#e5e7eb] hover:shadow-lg transition-all">
                        <span className="text-4xl mb-4 block">📝</span>
                        <h3 className="text-2xl font-bold text-[#2f4860] mb-2">Formatos Técnicos</h3>
                        <div className="inline-block bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded mb-4">Próximamente</div>
                        <p className="text-gray-600 mb-6">Memorias descriptivas, metrados y presupuestos tipo.</p>
                        <span className="text-gray-400 cursor-not-allowed">No disponible aún</span>
                    </div>

                    {/* Nanobanana Card */}
                    <div className="bg-[#fff1f2] rounded-2xl p-8 border border-[#ffe4e6] hover:shadow-lg transition-all">
                        <span className="text-4xl mb-4 block">🍌</span>
                        <h3 className="text-2xl font-bold text-[#2f4860] mb-2">Nanobanana</h3>
                        <p className="text-gray-600 mb-6">Recursos creativos y experimentales fuera de la caja.</p>
                        <span className="text-[#e11d48] font-bold">En construcción</span>
                    </div>

                    {/* ETABS Card */}
                    <div className="bg-[#fdf2f8] rounded-2xl p-8 border border-[#fce7f3] hover:shadow-lg transition-all">
                        <span className="text-4xl mb-4 block">🏢</span>
                        <h3 className="text-2xl font-bold text-[#2f4860] mb-2">ETABS</h3>
                        <p className="text-gray-600 mb-6">Hojas de cálculo para diseño sísmico y manuales.</p>
                        <span className="text-[#db2777] font-bold">En construcción</span>
                    </div>
                </div>
            </main>
        </div>
    );
}
