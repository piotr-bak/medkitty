import Image from 'next/image';

import { useFetch } from '@/app/_lib/hooks/useFetch';
import type { Dose } from '@/app/_types';

import styles from './DoseSummary.module.scss';
import Illustration from '../../_assets/vet-illustration.svg'
import { DoseDetails } from '../DoseDetails/DoseDetails';
//import { useEffect, useState } from 'react';
export function DoseSummary() {
    const { data, isLoading, isError } = useFetch<Dose[] | undefined>( '/api/summary' );
    //const [sortedData, setSortedData] = useState<Dose[] | undefined>();

    // useEffect( () => {
    //     if ( typeof doses !== 'undefined' ) {
    //         const sortedData = sortDoseData( doses );
    //         setSortedDoses( sortedData as Dose[] );
    //     }
    // }, [sortedData, data] );

    return (
        <section>
            <div className={styles.wrapper}>
                {data ? data.map( item => {
                    const pet = item.day.medicationPlan.pet;
                    const petName = Array.isArray( pet ) ? pet.map( p => p.name ).join( ', ' ) : pet.name;
                    return (
                        <div key={crypto.randomUUID()} className={styles.cardOuter}>
                            <h3 className={styles.cardHeading}>for {petName}</h3>
                            <div className={styles.cardInner}>
                                <DoseDetails doseData={item} />
                                <button>done</button>
                                <button>skip</button>
                            </div>
                        </div>
                    )
                } ) : (
                    <Image src={Illustration} alt={'dog at the vet'} />
                )}
            </div>
        </section>
    )
}
