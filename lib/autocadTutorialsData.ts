export interface AutoCADTutorial {
    id: string;
    title: string;
    description: string;
    videoUrl: string;
    date: string;
    thumbnail?: string;
}

export const autocadTutorials: AutoCADTutorial[] = [
    {
        id: '1',
        title: 'Dominando Bloques Dinámicos en AutoCAD',
        description: 'Aprende a crear bloques inteligentes que se adaptan a tus necesidades de dibujo automatizado.',
        videoUrl: 'https://www.youtube.com/embed/videoseries?list=PLx0sYbCqOb8TBPRdmBHs5Iftvv9TPboYG',
        date: '2026-01-12',
    },
    {
        id: '2',
        title: 'Configuración Avanzada de Layouts y Escalas',
        description: 'Domina el espacio papel y las escalas anotativas para planos profesionales.',
        videoUrl: 'https://www.youtube.com/embed/videoseries?list=PLx0sYbCqOb8TBPRdmBHs5Iftvv9TPboYG',
        date: '2026-01-08',
    },
    {
        id: '3',
        title: 'Introducción al Dibujo 2D Técnico',
        description: 'Comandos esenciales y metodologías de trabajo para precisión milimétrica.',
        videoUrl: 'https://www.youtube.com/embed/videoseries?list=PLx0sYbCqOb8TBPRdmBHs5Iftvv9TPboYG',
        date: '2026-01-02',
    }
];
