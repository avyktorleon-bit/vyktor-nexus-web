export interface ETABSTutorial {
    id: string;
    title: string;
    description: string;
    videoUrl: string;
    date: string;
    thumbnail?: string;
}

export const etabsTutorials: ETABSTutorial[] = [
    {
        id: '1',
        title: 'Análisis Dinámico Lineal en ETABS 2026',
        description: 'Configuración de espectros de respuesta y combinación modal para el análisis sísmico.',
        videoUrl: 'https://www.youtube.com/embed/videoseries?list=PLx0sYbCqOb8TBPRdmBHs5Iftvv9TPboYG',
        date: '2026-01-11',
    },
    {
        id: '2',
        title: 'Modelado de Placas y Muros de Corte',
        description: 'Técnicas avanzadas para el modelado de elementos tipo Shell y asignación de Pier Labels.',
        videoUrl: 'https://www.youtube.com/embed/videoseries?list=PLx0sYbCqOb8TBPRdmBHs5Iftvv9TPboYG',
        date: '2026-01-07',
    },
    {
        id: '3',
        title: 'Diseño de Elementos de Concreto Armado',
        description: 'Configuración de preferencias de diseño y verificación de ratios de demanda-capacidad.',
        videoUrl: 'https://www.youtube.com/embed/videoseries?list=PLx0sYbCqOb8TBPRdmBHs5Iftvv9TPboYG',
        date: '2026-01-03',
    }
];
