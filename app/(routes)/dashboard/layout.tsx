import type { ReactNode } from 'react';

import { UserProvider } from '@auth0/nextjs-auth0/client';

import { Navbar } from '@/app/_components/Navbar/Navbar';

import styles from './page.module.scss';

export default function Layout( { children }: { children: ReactNode } ) {
    return (
        <>
            <Navbar />
            {children}
        </>
    );
}
