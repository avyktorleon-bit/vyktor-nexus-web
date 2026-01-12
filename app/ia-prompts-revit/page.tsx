import Link from 'next/link';
import { BrandHeader } from '@/components/layout/BrandHeader';

export default function IAPromptsRevitPage() {
    return (
        <div className="min-h-screen bg-white font-sans">
            <BrandHeader />
            <main className="container mx-auto px-4 py-12">
                <h1 className="text-4xl font-bold text-[#2f4860] mb-2">Prompts de IA para Revit</h1>
                <p className="text-xl text-gray-600 mb-10">Genera ideas, scripts de Dynamo y soluciones BIM con inteligencia artificial.</p>

                <div className="mt-10 p-12 bg-[#eef6fc] rounded-xl text-center">
                    <div className="text-5xl text-[#ea7048] mb-6">
                        <i className="fas fa-microchip"></i> {/* Fallback format if font awesome not loaded, using emoji for now to be safe or assuming fa is loaded globally? using emoji/svg is safer */}
                        🔧
                    </div>
                    <h2 className="text-2xl font-bold text-[#2f4860] mb-4">Biblioteca en Construcción</h2>
                    <p className="text-gray-600 mb-6">Pronto encontrarás una colección curada de prompts para optimizar tus modelos BIM.</p>
                    <Link href="/" className="inline-block bg-[#ea7048] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#d15d36] transition-colors">
                        Volver al Inicio
                    </Link>
                </div>
            </main>
        </div>
    );
}
