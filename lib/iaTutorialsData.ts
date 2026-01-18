export interface IATutorial {
    id: string;
    title: string;
    description: string;
    videoUrl: string;
    date: string;
    thumbnail?: string;
}

export const iaTutorials: IATutorial[] = [
    {
        id: '1',
        title: 'Midjourney + Revit: Flujo de Visualización 2026',
        description: 'Combinando esquemas de planos con IA para generar renders conceptuales de alto impacto.',
        videoUrl: 'https://www.youtube.com/embed/videoseries?list=PLx0sYbCqOb8TBPRdmBHs5Iftvv9TPboYG',
        date: '2026-01-13',
    },
    {
        id: '2',
        title: 'Stable Diffusion para Arquitectura Sostenible',
        description: 'Uso de modelos entrenados para optimizar fachadas bioclimáticas y texturizado procedimental.',
        videoUrl: 'https://www.youtube.com/embed/videoseries?list=PLx0sYbCqOb8TBPRdmBHs5Iftvv9TPboYG',
        date: '2026-01-09',
    },
    {
        id: '3',
        title: 'Custom GPTs para Gestión Escrita de Proyectos',
        description: 'Cómo crear un asistente personalizado que conozca las normativas peruanas y estándares BIM.',
        videoUrl: 'https://www.youtube.com/embed/videoseries?list=PLx0sYbCqOb8TBPRdmBHs5Iftvv9TPboYG',
        date: '2026-01-04',
    }
];
