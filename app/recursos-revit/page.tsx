import { BrandHeader } from '@/components/layout/BrandHeader';
import RevitResourcesView from './RevitResourcesView';

export const metadata = {
    title: 'Recursos Revit | Vyktor Nexus',
    description: 'Biblioteca de plantillas, familias, scripts y hojas para Revit. Optimiza tus proyectos BIM con recursos profesionales.',
};

export default function ResourcesRevitPage() {
    return (
        <>
            <BrandHeader />
            <RevitResourcesView />
        </>
    );
}
