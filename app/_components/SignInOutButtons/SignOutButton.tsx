import { signOut } from '@/auth';
import styles from './button.module.scss';

export function SignOutButton() {
    return (
        <form
            action={async () => {
                'use server'
                await signOut( { redirectTo: '/' } );
            }}
        >
            <button type='submit' className={styles.button}>sign out</button>
        </form>
    )
}
