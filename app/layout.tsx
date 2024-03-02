import Navbar from './components/navigation/navbar/Navbar'
import Footer from './components/navigation/footer/Footer';
import type { Metadata } from "next";
import { Karla } from "next/font/google";
import "./globals.css";

const karla = Karla({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MedKitty",
  description: "An intuitive web app crafted to help you with pet medication management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={karla.className}>
        <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
