import type { Day, Dose } from '@/app/_types';
import styles from './DayView.module.scss';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent, {
    timelineOppositeContentClasses,
} from '@mui/lab/TimelineOppositeContent';
import { useFetch } from '@/app/_lib/hooks/useFetch';
import { convertOffsetToTime } from '@/app/_lib/utils/secondsElapsedFromMidnight';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend( localizedFormat );


export function DayView( { dayData }: { dayData: Day } ) {
    const { id, medicationPlanId: planId, date, doses } = dayData;
    return (
        <>
            {dayData && (
                <>
                    <div className={styles.topbar}>
                        <h2 className={styles.lead}>schedule for {dayjs( date ).format( 'LL' )}</h2>
                    </div>
                    <Timeline
                        sx={{
                            [`& .${timelineOppositeContentClasses.root}`]: {
                                flex: 0.2,
                            },
                        }}>
                        <div className={styles.panel}>
                            {doses.map( ( item: Dose ) => {
                                const dose = {
                                    name: item.medication.name,
                                    amount: item.plannedAmount,
                                    unit: ( item.plannedAmount === 1 ) ?
                                        item.medication.doseUnit :
                                        ( item.medication.doseUnit.slice( -1 ) === 's' ?
                                            item.medication.doseUnit :
                                            `${item.medication.doseUnit}s` ),
                                    administerTime: convertOffsetToTime( item.offset ),
                                }
                                return (
                                    <TimelineItem key={crypto.randomUUID()}>
                                        <TimelineOppositeContent>
                                            {dose.administerTime}
                                        </TimelineOppositeContent>
                                        <TimelineSeparator>
                                            <TimelineDot />
                                            <TimelineConnector />
                                        </TimelineSeparator>
                                        <TimelineContent>
                                            <h3>{dose.name}</h3>
                                            <p>in dose of {dose.amount} {dose.unit}</p>
                                        </TimelineContent>
                                    </TimelineItem>
                                )
                            } )}
                        </div>
                    </Timeline>
                </>
            )}
        </>
    );
}
