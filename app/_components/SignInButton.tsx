import { signIn } from '@/auth';

export function SignInButton() {
    return (
        <form
            action={async () => {
                'use server'
                await signIn( 'google', { redirectTo: '/dashboard' } );
            }}
        >
            <button type='submit'>sign in</button>
        </form>
    )
}
