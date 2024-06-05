'use client'
import { useSearchParams } from "next/navigation";
import { PetForm } from "@/app/_components/PetForm/PetForm";
import Link from "next/link";
import styles from './page.module.scss';
import { useModal } from "@/app/_lib/hooks/useModal";
import { Modal } from "@/app/_components/Modal/Modal";
import { PlanForm } from "@/app/_components/PlanForm/PlanForm";
import { PlanView } from "@/app/_components/PlanView/PlanView";


export default function Page() {
    const searchParams = useSearchParams();
    const petId = searchParams.get( 'id' );
    const { ref, onOpen, onClose } = useModal();

    return (
        <main className={styles.container}>
            <section className={styles.record}>
                <PetForm petId={petId} />
                <Link href={'/dashboard'}>
                    <button>go back</button>
                </Link>
            </section>
            <section>
                <PlanForm />
                <PlanView />
            </section>
            {/* <Modal ref={ref} onClose={onClose} /> */}
        </main>
    )
}
