import { SessionProvider } from "next-auth/react";
import type { ReactNode } from "react";
import { Navbar } from "@/app/_components/Navbar/Navbar";
import styles from './page.module.scss';

export default function Layout( { children }: { children: ReactNode } ) {
    return (
        <SessionProvider>
            <Navbar />
            {children}
        </SessionProvider>
    )
}
