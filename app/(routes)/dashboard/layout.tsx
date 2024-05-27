import { SessionProvider } from "next-auth/react";
import { type ReactNode } from "react";
import { Navbar } from "@/app/_components/Navbar/Navbar";
import styles from './page.module.scss';

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
