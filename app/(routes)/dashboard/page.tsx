import { SignOutButton } from "@/app/_components/SignInOutButtons/SignOutButton";
import { UserInfo } from "@/app/_components/UserInfo/UserInfo";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import styles from './page.module.scss';

interface DashboardChildren {
    children: ReactNode;
}
export default function Dashboard( { children }: DashboardChildren ) {
    return (
        <SessionProvider>
            <nav className={styles.navbar}>
                <UserInfo />
                <SignOutButton />
            </nav>
            {children}
        </SessionProvider>
    )
}
