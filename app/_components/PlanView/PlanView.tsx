'use client'
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useFetch } from '@/app/_lib/hooks/useFetch';
import type { MedicationPlan } from '@/app/_types';
import styles from './PlanView.module.scss';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import type { SyntheticEvent } from 'react';

export function PlanView( { data }: { data: MedicationPlan | null | undefined } ) {
    //const petId = useSearchParams().get( 'id' );
    const [value, setValue] = useState( "0" );

    // if ( isLoading ) return <div>loading data</div>

    // if ( isError ) return <div>error loading data</div>

    const handleChange = ( event: SyntheticEvent, newValue: string ) => {
        setValue( newValue );
    };

    return (
        <div className={styles.wrapper}>
            {( data?.days ) &&
                <TabContext value={value}>
                    <TabList onChange={handleChange}>
                        {data.days.map( ( _, index ) => {
                            return (
                                <Tab label={`day ${index + 1}`} value={String( index )}></Tab>
                            )
                        } )}
                    </TabList>
                    {data.days.map( ( day, index ) => {
                        return (
                            <TabPanel value={String( index )}>
                                <div className={styles.panel}>
                                    <p>{`${day.date}`}</p>
                                    {JSON.stringify( day )}
                                    <button className={styles.button}>add a dose</button>
                                </div>
                            </TabPanel>
                        )
                    } )}
                </TabContext>
            }
        </div>
    )
}
