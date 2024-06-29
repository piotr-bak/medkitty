'use client'
import type { GridColDef } from '@mui/x-data-grid';

import { DataGrid } from '@mui/x-data-grid';

import { useFetch } from '@/app/_lib/hooks/useFetch';
import type { Medication } from '@/app/_types';

import styles from './MedicationList.module.scss';

export function MedicationList() {
    const { data: medications, isLoading, isError } = useFetch<Medication[]>( `${process.env.NEXT_PUBLIC_APP_URL}/api/medications` );

    if ( isLoading ) return <div>Loading...</div>;
    if ( isError ) return <div>Error loading medications</div>;

    return (
        <div className={styles.wrapper}>
            <p>medications</p>
            <div>{JSON.stringify( medications )}</div>
        </div>
    )
}
