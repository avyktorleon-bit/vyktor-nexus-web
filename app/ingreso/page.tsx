import { redirect } from 'next/navigation';
import LoginForm from './LoginForm';
import { checkAuth } from './actions';

export const runtime = 'edge';

export default async function LoginPage() {
    const authenticated = await checkAuth();

    if (authenticated) {
        redirect('/panel-personal');
    }

    return <LoginForm />;
}
