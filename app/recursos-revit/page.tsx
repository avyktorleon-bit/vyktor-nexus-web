import { BrandHeader } from '@/components/layout/BrandHeader';

export default function ResourcesRevitPage() {
    return (
        <div className="min-h-screen bg-[#dde8f4] font-sans">
            <BrandHeader />
            <main className="container mx-auto px-4 py-20 text-center">
                <h1 className="text-4xl font-bold text-[#2f4860] mb-4 uppercase">Recursos de Revit</h1>
                <p className="text-xl text-[#83a0b5] mb-8">Plantillas, familias y configuraciones optmizadas para tus proyectos BIM.</p>
                <div className="bg-white p-12 rounded-3xl shadow-sm border border-gray-100 inline-block">
                    <span className="text-6xl mb-4 block">📂</span>
                    <h2 className="text-2xl font-bold text-[#2f4860]">Biblioteca de activos</h2>
                    <p className="text-gray-500 mt-2">Pronto podrás descargar material exclusivo directamente aquí.</p>
                </div>
            </main>
        </div>
    );
}
