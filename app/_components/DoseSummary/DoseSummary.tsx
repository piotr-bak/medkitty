import { useFetch } from '@/app/_lib/hooks/useFetch';
import type { Dose } from '@/app/_types';

import styles from './DoseSummary.module.scss';
import { DoseDetails } from '../DoseDetails/DoseDetails';

export function DoseSummary() {
    const { data, isError } = useFetch<Dose[] | undefined>( '/api/summary' );
    return (
        <section>
            <h1>summary</h1>
            <div className={styles.wrapper}>
                {data && data.map( item => {
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
                } )}
            </div>
        </section>
    )
}
