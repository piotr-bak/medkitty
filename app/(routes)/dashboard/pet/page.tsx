'use client'
import { useSearchParams } from "next/navigation";
import { PetForm } from "@/app/_components/PetForm/PetForm";
import Link from "next/link";
import styles from './page.module.scss';
import { useModal } from "@/app/_lib/hooks/useModal";
import { Modal } from "@/app/_components/Modal/Modal";
import { PlanForm } from "@/app/_components/PlanForm/PlanForm";
import { PlanView } from "@/app/_components/PlanView/PlanView";
import { useFetch } from "@/app/_lib/hooks/useFetch";
import type { MedicationPlan } from "@/app/_types";
import { useEffect, useState } from "react";

export default function Page() {
    const petId = useSearchParams().get( 'id' );
    const { data, isLoading, isError } = useFetch<MedicationPlan>( `${process.env.NEXT_PUBLIC_APP_URL}/api/pets/${petId && `plan?id=${petId}`}` )
    const { ref, onOpen, onClose } = useModal();

    useEffect( () => console.log( data ) );

    return (
        <main className={styles.container}>
            <section className={styles.record}>
                <PetForm petId={petId} />
                <Link href={'/dashboard'}>
                    <button>go back</button>
                </Link>
            </section>
            <section className={styles.planSection}>
                {data ? <PlanView data={data} /> : ( data === null ? <PlanForm /> : undefined )}
            </section>
            {/* <Modal ref={ref} onClose={onClose} /> */}
        </main>
    )
}
