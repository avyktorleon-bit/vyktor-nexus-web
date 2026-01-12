import { BrandHeader } from '@/components/layout/BrandHeader';

export default function ResourcesAutocadPage() {
    return (
        <div className="min-h-screen bg-[#dde8f4] font-sans">
            <BrandHeader />
            <main className="container mx-auto px-4 py-20 text-center">
                <h1 className="text-4xl font-bold text-[#2f4860] mb-4 uppercase">Recursos de AutoCAD</h1>
                <p className="text-xl text-[#83a0b5] mb-8">Bloques, librerías y scripts para potenciar tus dibujos técnicos.</p>
                <div className="bg-white p-12 rounded-3xl shadow-sm border border-gray-100 inline-block">
                    <span className="text-6xl mb-4 block">📐</span>
                    <h2 className="text-2xl font-bold text-[#2f4860]">Librería CAD</h2>
                    <p className="text-gray-500 mt-2">Estamos organizando los archivos para que los descargues pronto.</p>
                </div>
            </main>
        </div>
    );
}
