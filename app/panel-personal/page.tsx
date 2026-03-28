import Link from 'next/link';
import { redirect } from 'next/navigation';
import { checkAuth, logoutAction } from '../ingreso/actions';

export const runtime = 'edge';

const links = [
    {
        title: 'Inspecciones',
        description: 'Accede al listado y edición de inspecciones técnicas.',
        href: '/inspecciones',
        accent: 'border-[#ea7048] text-[#ea7048]',
    },
    {
        title: 'Nueva inspección',
        description: 'Crea un nuevo registro técnico desde cero.',
        href: '/inspeccion-tecnica?new=true',
        accent: 'border-[#52aeb2] text-[#52aeb2]',
    },
];

export default async function PanelPersonalPage() {
    const authenticated = await checkAuth();

    if (!authenticated) {
        redirect('/ingreso');
    }

    return (
        <div className="min-h-screen bg-[#f3f7fb] text-[#2f4860]">
            <header className="border-b border-gray-200 bg-white">
                <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
                    <div>
                        <p className="text-xs font-black uppercase tracking-[0.25em] text-[#ea7048]">Panel privado</p>
                        <h1 className="text-2xl font-black text-[#0a0f18]">Vyktor Nexus</h1>
                    </div>

                    <form action={logoutAction}>
                        <button
                            type="submit"
                            className="rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-bold text-red-500 transition hover:bg-red-500 hover:text-white"
                        >
                            Cerrar sesión
                        </button>
                    </form>
                </div>
            </header>

            <main className="mx-auto max-w-6xl px-6 py-10">
                <section className="mb-8 rounded-[2rem] bg-[#0a192f] px-8 py-10 text-white shadow-xl">
                    <p className="mb-3 text-xs font-black uppercase tracking-[0.3em] text-[#ea7048]">Espacio interno</p>
                    <h2 className="mb-3 text-4xl font-black leading-tight">Herramientas de gestión</h2>
                    <p className="max-w-2xl text-sm text-slate-300 md:text-base">
                        Este acceso privado concentra las rutas operativas del sistema. Desde aquí puedes entrar rápido a inspecciones y continuar el flujo técnico sin volver al sitio público.
                    </p>
                </section>

                <section className="grid gap-6 md:grid-cols-2">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="group rounded-[2rem] border border-gray-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                        >
                            <div className={`mb-5 inline-flex rounded-full border px-3 py-1 text-[11px] font-black uppercase tracking-[0.22em] ${link.accent}`}>
                                Acceso directo
                            </div>
                            <h3 className="mb-3 text-2xl font-black text-[#0a0f18]">{link.title}</h3>
                            <p className="mb-6 text-sm leading-relaxed text-gray-500">{link.description}</p>
                            <span className="font-bold text-[#ea7048] transition group-hover:tracking-wide">Abrir →</span>
                        </Link>
                    ))}
                </section>
            </main>
        </div>
    );
}
