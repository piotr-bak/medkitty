'use client';

import { useEffect, useState } from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { useSearchParams } from 'next/navigation';

import { PetDetails } from '@/app/_components/PetDetails/PetDetails';
import { PetForm } from '@/app/_components/PetForm/PetForm';
import { PlanBoard } from '@/app/_components/PlanBoard/PlanBoard';
import { PlanForm } from '@/app/_components/PlanForm/PlanForm';
import { useFetch } from '@/app/_lib/hooks/useFetch';
import type { MedicationPlan } from '@/app/_types';
import type { PetFormMode } from '@/app/_types';

import styles from './page.module.scss';

export default function Page() {
    const petId = useSearchParams().get( 'id' );
    const modeParam = useSearchParams().get( 'mode' );
    const mode: PetFormMode = modeParam === 'edit' ? 'edit' : 'view';

    const { data, isLoading, isError } = useFetch<MedicationPlan>(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/pets/${petId && `plan?id=${petId}`}`,
    );

    const [drawerOpen, setDrawerOpen] = useState( false );

    useEffect( () => {
        if ( petId ) {
            setDrawerOpen( true );
        }
    }, [petId] );

    return (
        <main className={styles.container}>
            {( petId === null || mode === 'edit' ) ? (
                <section className={styles.petData}>
                    <PetForm petId={petId} mode={mode} />
                </section>
            ) : (
                <>
                    {data ? (
                        <section className={styles.planSection}>
                            <PetDetails petId={petId} />
                            <PlanBoard data={data} />
                        </section>
                    ) : data === null ? (
                        <section className={styles.planSection}>
                            <PetDetails petId={petId} />
                            <PlanForm />
                        </section>
                    ) : undefined}
                </>
            )}
        </main>
    );
}
