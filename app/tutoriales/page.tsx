import { BrandHeader } from '@/components/layout/BrandHeader';

export default function TutorialsPage() {
    return (
        <div className="min-h-screen bg-[#dde8f4] font-sans">
            <BrandHeader />
            <main className="container mx-auto px-4 py-20 text-center">
                <h1 className="text-4xl font-bold text-[#2f4860] mb-4 uppercase">Explora nuestros Tutoriales</h1>
                <p className="text-xl text-[#83a0b5] mb-8">Contenido educativo especializado en ingeniería y arquitectura.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {['AutoCAD', 'Revit', 'ETABS', 'IA'].map(topic => (
                        <div key={topic} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <h3 className="text-xl font-bold text-[#2f4860] mb-2">{topic}</h3>
                            <p className="text-gray-500 text-sm">Próximamente contenido nuevo sobre {topic}.</p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
