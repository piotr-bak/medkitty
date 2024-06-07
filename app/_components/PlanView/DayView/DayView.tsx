import type { Day } from '@/app/_types';
import styles from './DayView.module.scss';
import { useFetch } from '@/app/_lib/hooks/useFetch';

export function DayView( { dayData }: { dayData: Day } ) {
    const { id, medicationPlanId: planId, date, doses } = dayData;
    return (
        <>
            <div className={styles.panel}>
                <p>{`${date}`}</p>
                {JSON.stringify( doses )}
            </div>
        </>
    );
}
