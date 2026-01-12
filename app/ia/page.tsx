import { BrandHeader } from '@/components/layout/BrandHeader';

export default function IAPromptsPage() {
    return (
        <div className="min-h-screen bg-[#dde8f4] font-sans">
            <BrandHeader />
            <main className="container mx-auto px-4 py-20 text-center">
                <h1 className="text-4xl font-bold text-[#2f4860] mb-4 uppercase">Google AI & Gemini</h1>
                <p className="text-xl text-[#83a0b5] mb-8">Potencia tu flujo de trabajo en ingeniería y arquitectura usando modelos de lenguaje avanzados.</p>
                <div className="bg-white p-12 rounded-3xl shadow-sm border border-gray-100 inline-block max-w-2xl">
                    <span className="text-6xl mb-4 block">🤖</span>
                    <h2 className="text-2xl font-bold text-[#2f4860]">Gemini en el Sector AEC</h2>
                    <p className="text-gray-500 mt-2">Estamos desarrollando una serie de tutoriales sobre cómo usar Gemini para analizar especificaciones técnicas, optimizar metrados y generar scripts de automatización.</p>
                </div>
            </main>
        </div>
    );
}
