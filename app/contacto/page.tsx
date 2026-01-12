import { BrandHeader } from '@/components/layout/BrandHeader';

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-[#dde8f4] font-sans">
            <BrandHeader />
            <main className="container mx-auto px-4 py-20 text-center">
                <h1 className="text-4xl font-bold text-[#2f4860] mb-4 uppercase">Contacto</h1>
                <p className="text-xl text-[#83a0b5] mb-8">¿Tienes alguna duda o proyecto en mente? ¡Escríbeme!</p>

                <div className="max-w-xl mx-auto bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-left">
                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-[#2f4860] mb-1">Nombre</label>
                            <input type="text" className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#ea7048]" placeholder="Tu nombre" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-[#2f4860] mb-1">Email</label>
                            <input type="email" className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#ea7048]" placeholder="tu@email.com" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-[#2f4860] mb-1">Mensaje</label>
                            <textarea className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#ea7048] h-32" placeholder="¿En qué puedo ayudarte?"></textarea>
                        </div>
                        <button type="button" className="w-full bg-[#ea7048] text-white font-bold py-3 rounded-lg hover:bg-[#d15d36] transition-colors">
                            Enviar Mensaje
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
}
