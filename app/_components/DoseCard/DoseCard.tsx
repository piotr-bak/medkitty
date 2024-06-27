import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import Stack from '@mui/material/Stack';

import { convertOffsetToTime } from '@/app/_lib/utils/secondsElapsedFromMidnight';
import type { DoseCardProps } from '@/app/_types';

import styles from './DoseCard.module.scss';
import { DoseDetails } from '../DoseDetails/DoseDetails';


export function DoseCard( { doseData }: DoseCardProps ) {
    return (
        <>
            <TimelineItem key={crypto.randomUUID()}>
                <TimelineOppositeContent>
                    {Array.isArray( doseData ) ? convertOffsetToTime( doseData[0].offset ) : convertOffsetToTime( doseData.offset )}
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineDot />
                    <TimelineConnector />
                </TimelineSeparator>
                {Array.isArray( doseData ) ? (
                    <TimelineContent className={styles.timelineContent}>
                        {doseData.map( ( subitem ) => {
                            return (
                                <DoseDetails key={crypto.randomUUID()} dose={subitem} />
                            )
                        } )}
                    </TimelineContent>
                ) : (
                    <TimelineContent className={styles.timelineContent}>
                        <DoseDetails dose={doseData} />
                        {/* <div>
                            <h3>{data.medication.name}</h3>
                        </div> */}
                    </TimelineContent>
                )}
            </TimelineItem>
        </>
    )
}
//m/wrg/2024/06/wz/01948
