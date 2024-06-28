import type { Metadata } from 'next';

import type { ReactNode } from 'react';

import { UserProvider } from '@auth0/nextjs-auth0/client';
import { Inter } from 'next/font/google';
import '@/app/styles/globals.scss';


const inter = Inter( { subsets: ['latin'] } );

export const metadata: Metadata = {
    title: 'MedKitty',
    description:
        'An app to manage the administration of medicines to pets, including tracking dosage and scheduling',
};

export default function RootLayout( {
    children,
}: Readonly<{
    children: ReactNode;
}> ) {
    return (
        <html lang="en">
            <UserProvider>
                <body className={inter.className}>{children}</body>
            </UserProvider>
        </html>
    );
}
