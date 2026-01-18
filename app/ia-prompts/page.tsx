import { BrandHeader } from '@/components/layout/BrandHeader';
import PromptLibraryView from './PromptLibraryView';

export const metadata = {
    title: 'Biblioteca Prompts IA | Vyktor Nexus',
    description: 'Colección de prompts de Inteligencia Artificial para Arquitectura, Estructuras y MEP. Optimiza tu flujo en AutoCAD y Revit.',
};

export default function IAPromptsPage() {
    return (
        <>
            <BrandHeader />
            <PromptLibraryView />
        </>
    );
}
