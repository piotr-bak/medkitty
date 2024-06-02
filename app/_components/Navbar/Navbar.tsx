import { UserInfo } from "../UserInfo/UserInfo";
import styles from './Navbar.module.scss';
export function Navbar() {
    return (
        <nav className={styles.navbar}>
            <UserInfo />
            <a href="/api/auth/logout">Logout</a>
        </nav>
    )
}
