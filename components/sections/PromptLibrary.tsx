"use client";
import React, { useState } from 'react';
import { CopyOutlined, CheckOutlined, BulbOutlined } from '@ant-design/icons';
import { message } from 'antd';

interface Prompt {
    id: number;
    title: string;
    description: string;
    content: string;
    category: 'AutoCAD' | 'Revit' | 'Midjourney' | 'Google AI' | 'General';
}

const prompts: Prompt[] = [
    {
        id: 1,
        title: 'Renderizado Conceptual',
        description: 'Usa este prompt en Midjourney para fachadas modernas y realistas.',
        content: '/imagine prompt: modern architectural facade, glass and concrete, cinematic lighting, photorealistic, 8k, architecture by Vyktor Nexus --ar 16:9',
        category: 'Midjourney'
    },
    {
        id: 2,
        title: 'Optimización de Familias',
        description: 'Prompt para ChatGPT para generar parámetros complejos en familias de Revit.',
        content: 'Actúa como un experto en Revit BIM. Ayúdame a crear una fórmula para un parámetro de visibilidad condicional que dependa del ancho y alto de la ventana...',
        category: 'Revit'
    },
    {
        id: 3,
        title: 'Automatización LISP',
        description: 'Pide a la IA que genere un script LISP para AutoCAD.',
        content: 'Genera un script AutoLISP que sume las áreas de todas las polilíneas cerradas en una capa específica y escriba el total en un archivo de texto.',
        category: 'AutoCAD'
    },
    {
        id: 4,
        title: 'Análisis de Programación con Gemini',
        description: 'Usa Google AI para analizar y optimizar el cronograma de obra a partir de una lista de tareas.',
        content: 'Actúa como un Planner de ingeniería. Analiza la siguiente lista de actividades y detecta posibles cuellos de botella y holguras críticas: [Lista de tareas]',
        category: 'Google AI'
    }
];

export function PromptLibrary() {
    const [copiedId, setCopiedId] = useState<number | null>(null);

    const handleCopy = (text: string, id: number) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        message.success('Prompt copiado al portapapeles');
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <section id="prompts" className="mt-16">
            <h2 className="text-3xl font-bold border-l-4 border-[#ea7048] pl-4 mb-8 text-[#2f4860]">Biblioteca de Prompts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {prompts.map((prompt) => (
                    <div key={prompt.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition-shadow">
                        <div className="p-6 flex-grow">
                            <div className="flex justify-between items-start mb-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${prompt.category === 'Google AI' ? 'bg-blue-100 text-blue-600' :
                                    prompt.category === 'Midjourney' ? 'bg-[#52aeb2]/10 text-[#52aeb2]' :
                                        prompt.category === 'Revit' ? 'bg-orange-100 text-orange-600' :
                                            'bg-gray-100 text-gray-600'
                                    }`}>
                                    {prompt.category}
                                </span>
                                <BulbOutlined className="text-gray-300 text-xl" />
                            </div>
                            <h3 className="text-xl font-bold text-[#2f4860] mb-2">{prompt.title}</h3>
                            <p className="text-gray-500 text-sm mb-4 leading-relaxed">
                                {prompt.description}
                            </p>
                            <div className="bg-gray-50 rounded-xl p-4 font-mono text-xs text-gray-600 border border-gray-100 relative group">
                                <p className="line-clamp-3 italic">"{prompt.content}"</p>
                                <button
                                    onClick={() => handleCopy(prompt.content, prompt.id)}
                                    className="absolute top-2 right-2 bg-white p-2 rounded-lg shadow-sm border border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-50"
                                    title="Copiar prompt"
                                >
                                    {copiedId === prompt.id ? <CheckOutlined className="text-green-500" /> : <CopyOutlined />}
                                </button>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-6 py-3 border-t border-gray-100">
                            <button
                                onClick={() => handleCopy(prompt.content, prompt.id)}
                                className="text-[#ea7048] font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all"
                            >
                                {copiedId === prompt.id ? '¡Copiado!' : 'Copiar para usar →'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
