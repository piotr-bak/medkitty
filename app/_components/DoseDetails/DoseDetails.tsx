import type { Dose } from '@/app/_types';
import styles from './DoseDetails.module.scss';
import { convertOffsetToTime } from '@/app/_lib/utils/secondsElapsedFromMidnight';

export function DoseDetails( { dose }: Dose ) {
    const item = {
        name: dose.medication.name,
        amount: dose.plannedAmount,
        unit: ( dose.plannedAmount === 1 ) ?
            dose.medication.doseUnit :
            ( dose.medication.doseUnit.slice( -1 ) === 's' ?
                dose.medication.doseUnit :
                `${dose.medication.doseUnit}s` ),
        administerTime: convertOffsetToTime( dose.offset ),
    }
    return (
        <div className={styles.wrapper}>
            <h3>{item.name}</h3>
            <p>{`amount: ${item.amount} ${item.unit}`}</p>
            <p>{`to be administered at: ${item.administerTime}`}</p>
        </div>
    )
}
