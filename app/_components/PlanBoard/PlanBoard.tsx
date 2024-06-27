'use client';

import { useEffect, useState, type SyntheticEvent } from 'react';

import EditIcon from '@mui/icons-material/Edit';
import PetsIcon from '@mui/icons-material/Pets';
import TuneIcon from '@mui/icons-material/Tune';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Tab from '@mui/material/Tab';

import { useModal } from '@/app/_lib/hooks/useModal';
import type { MedicationPlan } from '@/app/_types';

import styles from './PlanBoard.module.scss';
import { DaySchedule } from '../DaySchedule/DaySchedule';
import { Dial } from '../Dial/Dial';
import { DoseForm } from '../DoseForm/DoseForm';
import { Modal } from '../Modal/Modal';



export function PlanBoard( {
    data,
}: {
    data: MedicationPlan | null | undefined;
} ) {
    const [value, setValue] = useState( '0' );
    const [activeDayId, setActiveDayId] = useState<string | undefined>(
        undefined,
    );

    const { ref, openModal, onClose } = useModal();

    const actions = [
        { icon: <TuneIcon />, name: 'Plan settings', target: openModal },
    ];

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

    return (
        <>
            <div className={styles.schedule}>
                {data?.days && (
                    <>
                        <h1 className={styles.planTitle}>{data.name}</h1>
                        <TabContext value={value}>
                            <TabList onChange={handleChange} centered scrollButtons>
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
                                        <DaySchedule dayData={day} />
                                    </TabPanel>
                                );
                            } )}
                        </TabContext>
                    </>
                )}
            </div>
            <div className={styles.bottom}>
                <Dial actions={actions} openIcon={<PetsIcon />} />
            </div>
            <Modal ref={ref} onClose={onClose}>
                <DoseForm dayId={activeDayId ? activeDayId : ''} />
            </Modal>
        </>
    );
}
