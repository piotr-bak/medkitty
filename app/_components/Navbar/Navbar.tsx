import { AuthButton } from "../AuthButton/AuthButton";
import { UserInfo } from "../UserInfo/UserInfo";
import styles from './navbar.module.scss';
export function Navbar() {
    return (
        <nav className={styles.navbar}>
            <UserInfo />
            <AuthButton role={'sign-out'} />
        </nav>
    )
}
