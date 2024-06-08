import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Logout';
import Image from 'next/image';
import styles from './page.module.scss';
import logo from './_assets/logo.svg';
import illustration from './_assets/cat-and-dog.svg';

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
