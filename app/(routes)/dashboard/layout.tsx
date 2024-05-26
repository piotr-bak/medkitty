import { SessionProvider } from "next-auth/react";
import { type ReactNode } from "react";
import styles from './page.module.scss';
import { Navbar } from "@/app/_components/Navbar/Navbar";
interface DashboardLayoutProps {
    children: ReactNode;
}

export default function DashboardLayout( { children }: DashboardLayoutProps ) {
    return (
        <SessionProvider>
            <Navbar />
            {children}
        </SessionProvider>
    )
}
