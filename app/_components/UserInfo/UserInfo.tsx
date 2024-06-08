import { getSession } from '@auth0/nextjs-auth0';
import styles from './UserInfo.module.scss';

export async function UserInfo() {
    const session = await getSession();
    const user = session?.user;

    return (
        user && (
            <div className={styles.wrapper}>
                <p className={styles.userName}>Hello, {user.name.slice( ' ' )}</p>
            </div>
        )
    );
}
