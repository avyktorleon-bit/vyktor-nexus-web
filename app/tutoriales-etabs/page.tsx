import { BrandHeader } from '@/components/layout/BrandHeader';

export default function TutorialesEtabsPage() {
    return (
        <div className="min-h-screen bg-[#dde8f4] font-sans">
            <BrandHeader />
            <main className="container mx-auto px-4 py-20 text-center">
                <h1 className="text-4xl font-bold text-[#2f4860] mb-4 uppercase">Tutoriales de ETABS</h1>
                <p className="text-xl text-[#83a0b5] mb-8">Análisis estructural y diseño de edificaciones con ETABS.</p>
                <div className="bg-white p-12 rounded-3xl shadow-sm border border-gray-100 inline-block">
                    <span className="text-6xl mb-4 block">🏗️</span>
                    <h2 className="text-2xl font-bold text-[#2f4860]">Cálculo estructural</h2>
                    <p className="text-gray-500 mt-2">Próximamente guías detalladas sobre análisis sísmico y diseño.</p>
                </div>
            </main>
        </div>
    );
}
