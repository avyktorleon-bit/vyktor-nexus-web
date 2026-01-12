import Link from 'next/link';
import { BrandHeader } from '@/components/layout/BrandHeader';

export default function IAPromptsAutoCADPage() {
    return (
        <div className="min-h-screen bg-white font-sans">
            <BrandHeader />
            <main className="container mx-auto px-4 py-12">
                <h1 className="text-4xl font-bold text-[#2f4860] mb-2">Prompts de IA para AutoCAD</h1>
                <p className="text-xl text-gray-600 mb-10">Optimiza tu flujo de trabajo en CAD con estos prompts para IA generativa.</p>

                <div className="mt-10 p-12 bg-[#f0f4f8] rounded-xl text-center">
                    <div className="text-5xl text-[#2f4860] mb-6">
                        🤖
                    </div>
                    <h2 className="text-2xl font-bold text-[#2f4860] mb-4">Biblioteca en Construcción</h2>
                    <p className="text-gray-600 mb-6">Estamos recopilando los mejores prompts para generar scripts LISP y automatizar tareas.</p>
                    <Link href="/" className="inline-block bg-[#ea7048] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#d15d36] transition-colors">
                        Volver al Inicio
                    </Link>
                </div>
            </main>
        </div>
    );
}
