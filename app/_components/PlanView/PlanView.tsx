'use client';

import { useEffect, useState, type SyntheticEvent } from 'react';
import { useModal } from '@/app/_lib/hooks/useModal';
import type { MedicationPlan } from '@/app/_types';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Tab from '@mui/material/Tab';
import { DoseForm } from '../DoseForm/DoseForm';
import { Modal } from '../Modal/Modal';
import { DayView } from './DayView/DayView';
import styles from './PlanView.module.scss';

export function PlanView( {
    data,
}: {
    data: MedicationPlan | null | undefined;
} ) {
    //const petId = useSearchParams().get( 'id' );
    const [value, setValue] = useState( '0' );
    const [activeDayId, setActiveDayId] = useState<string | undefined>(
        undefined,
    );
    const { ref, openModal, onClose } = useModal();

    useEffect( () => {
        if ( data && data.days.length > 0 ) {
            setActiveDayId( data?.days[0]?.id );
        }
    }, [data] );

    const handleChange = ( event: SyntheticEvent, newValue: string ) => {
        setValue( newValue );
        if ( data?.days ) {
            setActiveDayId( data?.days[parseInt( newValue )]?.id );
        }
    };

    const handleButtonClick = () => {
        if ( activeDayId ) {
            console.log( `Active Day ID: ${activeDayId}` );
        }
        openModal();
    };

    return (
        <>
            <div className={styles.wrapper}>
                {data?.days && (
                    <>
                        <p>{data.name}</p>
                        <TabContext value={value}>
                            <TabList onChange={handleChange}>
                                {data.days.map( ( _, index ) => {
                                    return (
                                        <Tab
                                            key={crypto.randomUUID()}
                                            label={`day ${index + 1}`}
                                            value={String( index )}
                                        ></Tab>
                                    );
                                } )}
                            </TabList>
                            {data.days.map( ( day, index ) => {
                                return (
                                    <TabPanel value={String( index )} key={crypto.randomUUID()}>
                                        <DayView dayData={day} />
                                    </TabPanel>
                                );
                            } )}
                        </TabContext>
                        <button onClick={handleButtonClick}>add a dose</button>
                    </>
                )}
            </div>
            <Modal ref={ref} onClose={onClose}>
                <DoseForm dayId={activeDayId ? activeDayId : ''} />
            </Modal>
        </>
    );
}
