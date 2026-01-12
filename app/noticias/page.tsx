"use client";
import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { BrandHeader } from '@/components/layout/BrandHeader';
import { newsData } from '@/lib/newsData';

function NewsContent() {
    const searchParams = useSearchParams();
    // Get available categories first to validate the URL param
    const dbCategories = new Set(Object.values(newsData).map(a => a.category));
    const fixedCategories = ['BIM', 'Software', 'IA'];
    const categories = ['Todos', ...Array.from(new Set([...fixedCategories, ...Array.from(dbCategories)]))];

    const initialCat = searchParams.get('cat');

    // Determine initial filter based on URL param (case-insensitive match)
    const initialFilter = categories.find(c => c.toLowerCase() === initialCat?.toLowerCase()) || 'Todos';

    const [filter, setFilter] = useState<string>(initialFilter);

    // Update filter if URL changes (optional, but good for navigation)
    React.useEffect(() => {
        if (initialCat) {
            const match = categories.find(c => c.toLowerCase() === initialCat.toLowerCase());
            if (match) setFilter(match);
        } else {
            setFilter('Todos'); // Reset to 'Todos' if initialCat is removed from URL
        }
    }, [initialCat, categories]); // Added allCategories to dependency array

    const filteredNews = filter === 'Todos'
        ? Object.values(newsData)
        : Object.values(newsData).filter(article => article.category === filter);

    return (
        <main className="container mx-auto px-4 py-8 lg:py-12">

            {/* Hero Section */}
            <section className="text-center mb-12">
                <h1 className="text-4xl lg:text-5xl font-bold text-[#2f4860] mb-4 uppercase tracking-tight">Noticias y Actualidad</h1>
                <p className="text-xl text-[#83a0b5] max-w-2xl mx-auto">
                    Actualidad, tendencias, software, inteligencia artificial y procesos reales del sector construcción.
                </p>
            </section>

            {/* Filter Bar */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setFilter(category)}
                        className={`px-6 py-2 rounded-full font-bold text-sm transition-all shadow-sm ${filter === category ? 'bg-[#ea7048] text-white shadow-md transform scale-105' : 'bg-white text-gray-500 hover:bg-gray-100'}`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* News Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {filteredNews.length > 0 ? (
                    filteredNews.map((article) => (
                        <Link
                            href={`/noticias/${article.slug}`}
                            key={article.slug}
                            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 block group border border-gray-100"
                        >
                            <div className="h-48 bg-gray-200 overflow-hidden relative">
                                <div className="absolute inset-0 bg-[#e0e7ff] flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-500">
                                    {article.category === 'Infraestructura' ? '🏗️' : article.category === 'Transporte' ? '🚇' : article.category === 'Comercio' ? '🚢' : '📰'}
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-3">
                                    <span style={{ backgroundColor: article.tagColor }} className="text-white px-3 py-1 rounded-md text-xs uppercase font-bold tracking-wider">
                                        {article.category}
                                    </span>
                                    <span className="text-gray-400 text-xs">{article.date}</span>
                                </div>
                                <h3 className="text-xl font-bold text-[#2f4860] mb-3 leading-tight group-hover:text-[#ea7048] transition-colors">
                                    {article.title}
                                </h3>
                                <p className="text-gray-500 text-sm line-clamp-3">
                                    {article.subtitle}
                                </p>
                                <div className="mt-4 text-[#ea7048] font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                                    Leer artículo <span>→</span>
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="col-span-full text-center py-20 text-gray-400">
                        <p className="text-xl">No se encontraron noticias en esta categoría.</p>
                        <button onClick={() => setFilter('Todos')} className="text-[#ea7048] font-bold mt-4 hover:underline">Ver todas las noticias</button>
                    </div>
                )}
            </div>

        </main>
    );
}

export default function NoticiasPage() {
    return (
        <div className="min-h-screen bg-[#dde8f4] font-sans">
            <BrandHeader />
            <Suspense fallback={<div className="text-center py-20">Cargando filtros...</div>}>
                <NewsContent />
            </Suspense>
        </div>
    );
}
