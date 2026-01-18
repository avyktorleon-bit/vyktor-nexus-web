import { BrandHeader } from '@/components/layout/BrandHeader';
import AutoCADResourcesView from './AutoCADResourcesView';

export const metadata = {
    title: 'Recursos AutoCAD | Vyktor Nexus',
    description: 'Biblioteca de bloques dinámicos, plantillas DWT, rutinas LISP y detalles constructivos para AutoCAD. Optimiza tu flujo CAD.',
};

export default function ResourcesAutoCADPage() {
    return (
        <>
            <BrandHeader />
            <AutoCADResourcesView />
        </>
    );
}
