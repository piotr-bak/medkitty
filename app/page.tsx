import LoginIcon from '@mui/icons-material/Logout';
import Button from '@mui/material/Button';
import Image from 'next/image';

import illustration from './_assets/cat-and-dog.svg';
import logo from './_assets/logo.svg';
import styles from './page.module.scss';

export default function Page() {
    return (
        <main className={styles.main}>
            <Image
                src={logo}
                alt={'MEDKitty logo'}
                className={styles.logo}
                priority
            />
            <Image
                src={illustration}
                alt={'cat and dog playing together'}
                className={styles.illustration}
                priority
            />
            <a href="/api/auth/login" className={styles.loginButton}>
                <Button variant='contained' color='info' size="large" endIcon={<LoginIcon />}>Login</Button>
            </a>
        </main>
    );
}
