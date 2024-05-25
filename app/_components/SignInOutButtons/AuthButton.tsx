import { signIn, signOut } from "@/auth";
import styles from './authbutton.module.scss';

interface AuthButtonProps {
    role: 'sign-in' | 'sign-out';
}

export function AuthButton( { role }: AuthButtonProps ) {
    return (
        <form
            action={async () => {
                'use server'
                if ( role === 'sign-in' ) {
                    await signIn( 'google', { redirectTo: '/dashboard' } )
                } else {
                    await signOut( { redirectTo: '/' } );
                };
            }}
        >
            <button type='submit' className={styles.button}>sign {role === 'sign-in' ? 'in' : 'out'}</button>
        </form>
    )
}
