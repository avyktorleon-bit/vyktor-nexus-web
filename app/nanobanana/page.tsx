import { BrandHeader } from '@/components/layout/BrandHeader';

export default function NanobananaPage() {
    return (
        <div className="min-h-screen bg-[#dde8f4] font-sans">
            <BrandHeader />
            <main className="container mx-auto px-4 py-20 text-center">
                <h1 className="text-4xl font-bold text-[#2f4860] mb-4 uppercase">Nanobanana</h1>
                <p className="text-xl text-[#83a0b5] mb-8">Explora proyectos creativos y experimentación con IA.</p>
                <div className="bg-white p-16 rounded-[40px] shadow-sm border border-gray-100 inline-block max-w-2xl">
                    <span className="text-7xl mb-6 block">🍌</span>
                    <h2 className="text-3xl font-bold text-[#2f4860] mb-4">¡Algo loco se está cocinando!</h2>
                    <p className="text-gray-500 leading-relaxed">Nanobanana es el espacio de experimentación visual de Vyktor Nexus. Pronto verás los resultados aquí.</p>
                </div>
            </main>
        </div>
    );
}
