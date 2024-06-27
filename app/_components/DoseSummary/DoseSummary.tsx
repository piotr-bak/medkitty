import { useFetch } from '@/app/_lib/hooks/useFetch';

import { DoseDetails } from '../DoseDetails/DoseDetails';

import styles from './DoseSummary.module.scss';

export function DoseSummary() {
    const { data, isError } = useFetch<any>( '/api/summary' );
    return (
        <section>
            <h1>summary</h1>
            <div className={styles.wrapper}>
                {data && data.map( item => {
                    return (
                        <div className={styles.cardOuter}>
                            <h3 className={styles.cardHeading}>for {item.day.medicationPlan.pet.name}</h3>
                            <div className={styles.cardInner}>
                                <DoseDetails dose={item} />
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
