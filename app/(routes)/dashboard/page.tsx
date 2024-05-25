import { Dashboard } from "@/app/_components/Dashboard/Dashboard";
import { SessionProvider } from "next-auth/react";
import styles from './page.module.scss';

export default function DashboardPage() {
    return (
        <SessionProvider>
            <Dashboard />
        </SessionProvider>
    )
}
