import type { ReactNode } from 'react';
import { Navbar } from '@/app/_components/Navbar/Navbar';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import styles from './page.module.scss';

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <>
            <Navbar />
            {children}
        </>
    );
}
