'use client';

import { useEffect, useState } from 'react';
import { Modal } from '@/app/_components/Modal/Modal';
import { PetForm } from '@/app/_components/PetForm/PetForm';
import { PlanForm } from '@/app/_components/PlanForm/PlanForm';
import { PlanView } from '@/app/_components/PlanView/PlanView';
import { useFetch } from '@/app/_lib/hooks/useFetch';
import { useModal } from '@/app/_lib/hooks/useModal';
import type { MedicationPlan } from '@/app/_types';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import styles from './page.module.scss';

export default function Page() {
    const petId = useSearchParams().get('id');
    const { data, isLoading, isError } = useFetch<MedicationPlan>(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/pets/${petId && `plan?id=${petId}`}`,
    );

    useEffect(() => console.log(data));

    return (
        <main className={styles.container}>
            <section className={styles.record}>
                <PetForm petId={petId} />
                <Link href={'/dashboard'}>
                    <button>go back</button>
                </Link>
            </section>
            <section className={styles.planSection}>
                {data ? (
                    <PlanView data={data} />
                ) : data === null ? (
                    <PlanForm />
                ) : undefined}
            </section>
        </main>
    );
}
