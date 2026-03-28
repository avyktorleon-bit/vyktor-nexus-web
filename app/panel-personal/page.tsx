import { redirect } from 'next/navigation';
import PanelPersonalClient from './PanelPersonalClient';
import { checkAuth } from '../ingreso/actions';

export const runtime = 'edge';

export default async function PanelPersonalPage() {
    const authenticated = await checkAuth();

    if (!authenticated) {
        redirect('/ingreso');
    }

    return <PanelPersonalClient />;
}
