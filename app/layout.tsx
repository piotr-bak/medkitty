import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter( { subsets: ["latin"] } );

export const metadata: Metadata = {
  title: "MedKitty",
  description: "An app to manage the administration of medicines to pets, including tracking dosage and scheduling",
};

export default function RootLayout( {
  children,
}: Readonly<{
  children: ReactNode
}> ) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
