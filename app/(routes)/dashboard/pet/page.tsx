'use client'
import { useSearchParams } from "next/navigation";
import { PetDetails } from "@/app/_components/PetDetails/PetDetails";
import { MedTimeline } from "@/app/_components/MedTimeline/MedTimeline";
import Link from "next/link";
import styles from './page.module.scss';
import { useModal } from "@/app/_lib/hooks/useModal";
import { MedModal } from "@/app/_components/MedModal/MedModal";


export default function Page() {
    const searchParams = useSearchParams();
    const petId = searchParams.get( 'id' );
    const { ref, onOpen, onClose } = useModal();

    return (
        <main className={styles.container}>
            <section className={styles.record}>
                <PetDetails petId={petId} />
                <Link href={'/dashboard'}>
                    <button>go back</button>
                </Link>
            </section>
            <section>
                <MedTimeline />
                <button onClick={onOpen}>add medication</button>
            </section>
            <MedModal onClose={onClose} ref={ref} />
        </main>
    )
}
