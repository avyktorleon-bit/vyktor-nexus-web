export interface RevitTutorial {
    id: string;
    title: string;
    description: string;
    videoUrl: string;
    date: string;
    thumbnail?: string;
}

export const revitTutorials: RevitTutorial[] = [
    {
        id: '1',
        title: 'Optimización de Familias en Revit 2026',
        description: 'Aprende a crear parámetros compartidos y fórmulas avanzadas para tus familias paramétricas.',
        videoUrl: 'https://www.youtube.com/embed/videoseries?list=PLx0sYbCqOb8TBPRdmBHs5Iftvv9TPboYG',
        date: '2026-01-13',
    },
    {
        id: '2',
        title: 'Configuración de Plantilla BIM Profesional',
        description: 'Pasos esenciales para configurar tu plantilla de proyecto según estándares internacionales.',
        videoUrl: 'https://www.youtube.com/embed/videoseries?list=PLx0sYbCqOb8TBPRdmBHs5Iftvv9TPboYG',
        date: '2026-01-10',
    },
    {
        id: '3',
        title: 'Introducción a Revit Architecture',
        description: 'Conceptos básicos de modelado: muros, suelos, techos y componentes.',
        videoUrl: 'https://www.youtube.com/embed/videoseries?list=PLx0sYbCqOb8TBPRdmBHs5Iftvv9TPboYG',
        date: '2026-01-05',
    }
];
