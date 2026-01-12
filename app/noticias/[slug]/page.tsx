export const runtime = "edge";

import Link from 'next/link';
import { BrandHeader } from '@/components/layout/BrandHeader';
import { newsData } from '@/lib/newsData';

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function GenericNoticiaPage({ params }: Props) {
  const { slug } = await params;
  const article = newsData[slug];

  if (!article) {
    return (
      <div className="min-h-screen bg-[#dde8f4] font-sans">
        <BrandHeader />
        <main className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-2xl mx-auto bg-white p-12 rounded-3xl shadow-sm border border-gray-100">
            <h1 className="text-3xl font-bold text-[#2f4860] mb-4 uppercase tracking-tighter">
              Artículo no encontrado
            </h1>
            <p className="text-[#83a0b5] mb-8 text-lg">
              Lo sentimos, la noticia que buscas no está disponible.
            </p>
            <a
              href="/noticias"
              className="bg-[#2f4860] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#1a2d3d] transition-all"
            >
              Volver a Noticias
            </a>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#dde8f4] font-sans">
      <BrandHeader />
      <main className="container mx-auto px-4 py-12 lg:py-20">
        <article className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="h-64 md:h-96 bg-gray-200 relative overflow-hidden">
            <div className="absolute inset-0 bg-[#e0e7ff] flex items-center justify-center text-9xl select-none">
              {article.category === 'Infraestructura'
                ? '🏗️'
                : article.category === 'Transporte'
                ? '🚇'
                : article.category === 'Comercio'
                ? '🚢'
                : '📰'}
            </div>
          </div>

          <div className="p-8 md:p-12">
            <div className="flex flex-wrap gap-4 items-center mb-6">
              <span
                style={{ backgroundColor: article.tagColor }}
                className="text-white px-4 py-1.5 rounded-full text-sm uppercase font-bold tracking-wider"
              >
                {article.category}
              </span>
              <span className="text-gray-400 font-medium">{article.date}</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-[#2f4860] mb-8 leading-tight">
              {article.title}
            </h1>

            <div className="prose prose-lg text-gray-600 space-y-6 max-w-none">
              <p className="text-xl font-medium text-gray-800 leading-relaxed">
                {article.subtitle}
              </p>

              <div dangerouslySetInnerHTML={{ __html: article.content }} />

              {article.quote && (
                <div className="bg-orange-50 p-8 rounded-2xl border-l-8 border-[#ea7048] my-10 italic text-[#2f4860] font-medium text-lg">
                  "{article.quote}"
                </div>
              )}

              {article.extraSectionTitle && (
                <>
                  <h2 className="text-2xl font-bold text-[#2f4860] mt-10 mb-4">
                    {article.extraSectionTitle}
                  </h2>
                  <p>{article.extraSectionContent}</p>
                </>
              )}
            </div>

            <div className="mt-12 pt-12 border-t border-gray-100 flex items-center justify-between">
              <Link
                href="/noticias"
                className="text-[#ea7048] font-bold flex items-center gap-2 hover:gap-3 transition-all group"
              >
                <span className="transform group-hover:-translate-x-1 transition-transform">
                  ←
                </span>{' '}
                Volver a noticias
              </Link>

              <div className="flex gap-4">
                <span className="text-gray-400 text-sm font-medium">
                  Compartir:
                </span>
                <div className="flex gap-2 opacity-50">
                  <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                  <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
