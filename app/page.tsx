import styles from './page.module.scss';

export default function Page() {
    return (
        <main className={styles.main}>
            <h1>MedKitty</h1>
            <a href="/api/auth/login">Login</a>
        </main>
    );
}
