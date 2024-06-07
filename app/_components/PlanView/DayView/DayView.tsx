import type { Day } from '@/app/_types';
import styles from './DayView.module.scss';

export function DayView({ dayData }: { dayData: Day }) {
    const { id, medicationPlanId: planId, date, doses } = dayData;
    return (
        <>
            <div className={styles.panel}>
                {/* <p>{`${day.date}`}</p>
                {JSON.stringify( day )} */}
            </div>
        </>
    );
}
