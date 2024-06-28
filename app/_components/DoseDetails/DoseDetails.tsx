import { convertOffsetToTime } from '@/app/_lib/utils/secondsElapsedFromMidnight';
import type { DoseCardProps } from '@/app/_types';

import styles from './DoseDetails.module.scss';

export function DoseDetails( { doseData, className, ...rest }: DoseCardProps ) {
    const item = {
        name: doseData.medication.name,
        amount: doseData.plannedAmount,
        unit: ( doseData.plannedAmount === 1 ) ?
            doseData.medication.doseUnit :
            ( doseData.medication.doseUnit.slice( -1 ) === 's' ?
                doseData.medication.doseUnit :
                `${doseData.medication.doseUnit}s` ),
        administerTime: convertOffsetToTime( doseData.offset ),
    }
    return (
        <div className={styles.wrapper}>
            <h3>{item.name}</h3>
            <p>{`amount: ${item.amount} ${item.unit}`}</p>
            <p>{`to be administered at: ${item.administerTime}`}</p>
        </div>
    )
}
