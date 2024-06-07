import { UserInfo } from '../UserInfo/UserInfo';
import Link from 'next/link';
import styles from './Navbar.module.scss';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';

export function Navbar() {
    return (
        <nav className={styles.navbar}>
            <Link href={'/dashboard'}>
                <Button variant='outlined' startIcon={<HomeIcon />}>Home</Button>
            </Link>
            <div className={styles.infoAndLogout}>
                <UserInfo />
                <a href="/api/auth/logout" >
                    <Button variant='outlined' endIcon={<LogoutIcon />}>Log out</Button>
                </a>
            </div>
        </nav >
    );
}
