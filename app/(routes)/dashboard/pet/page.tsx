'use client';

import { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { PetForm } from '@/app/_components/PetForm/PetForm';
import { PlanForm } from '@/app/_components/PlanForm/PlanForm';
import { PlanView } from '@/app/_components/PlanView/PlanView';
import { useFetch } from '@/app/_lib/hooks/useFetch';
import { useSearchParams } from 'next/navigation';
import styles from './page.module.scss';
import MenuIcon from '@mui/icons-material/Menu';
import type { MedicationPlan } from '@/app/_types';
import type { PetFormMode } from '@/app/_types';

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
                    <IconButton
                        className={styles.puller}
                        onClick={() => setDrawerOpen( true )}
                    >
                        <MenuIcon />
                    </IconButton>
                    <SwipeableDrawer
                        anchor="left"
                        open={drawerOpen}
                        onClose={() => setDrawerOpen( false )}
                        onOpen={() => setDrawerOpen( true )}
                    >
                        <div className={styles.drawerContent}>
                            <PetForm petId={petId} />
                        </div>
                    </SwipeableDrawer>
                    {data ? (
                        <section className={styles.planSection}>
                            <PlanView data={data} />
                        </section>
                    ) : (
                        <section className={styles.planSection}>
                            <PlanForm />
                        </section>
                    )}
                </>
            )}
        </main>
    );
}
