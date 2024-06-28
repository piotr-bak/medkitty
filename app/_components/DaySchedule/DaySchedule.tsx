'use client';

import { useEffect, useState } from 'react';

import Timeline from '@mui/lab/Timeline';
import { timelineOppositeContentClasses } from '@mui/lab/TimelineOppositeContent';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';


import { sortDoseData } from '@/app/_lib/utils/sortDoseData';
import type { Day, Dose } from '@/app/_types';

import styles from './DaySchedule.module.scss';
import { DoseCard } from '../DoseCard/DoseCard';

dayjs.extend( localizedFormat );

export function DaySchedule( { dayData }: { dayData: Day } ) {
    const { id, medicationPlanId: planId, date, doses } = dayData;
    const [sortedDoses, setSortedDoses] = useState<Dose[] | undefined>();

    useEffect( () => {
        if ( typeof doses !== 'undefined' ) {
            const sortedData = sortDoseData( doses );
            setSortedDoses( sortedData as Dose[] );
        }
    }, [dayData, doses] );

    return (
        <>
            {console.log( sortedDoses )}
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
                            {sortedDoses && ( sortedDoses.map( ( dose ) => {
                                return (
                                    <>
                                        <DoseCard key={crypto.randomUUID()} doseData={dose} />
                                    </>
                                )
                            } ) )}
                        </div>
                    </Timeline>
                </>
            )}
        </>
    );
}
