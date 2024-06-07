'use client';

import { PetList } from '@/app/_components/PetList/PetList';
import Link from 'next/link';
import styles from './page.module.scss';
import PetsIcon from '@mui/icons-material/Pets';
import AddIcon from '@mui/icons-material/Add';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import MedicationIcon from '@mui/icons-material/Medication';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';

const actions = [
    { icon: <AddIcon />, name: 'Pets' },
    { icon: <MedicationIcon />, name: 'Medications' },
    { icon: <GroupAddIcon />, name: 'Invites' },
];

export default function Page() {
    return (
        <>
            <section>
                <PetList />
                {/* <Link href={'/dashboard/pet'}>
                    <button
                        className={styles.buttonAdd}
                        aria-label="add pet"
                    >
                        {'+'}
                    </button>
                </Link> */}
                <SpeedDial
                    ariaLabel='MedKitty main menu'
                    icon={<SpeedDialIcon openIcon={<PetsIcon />} />}
                    sx={{ position: 'absolute', bottom: 32, right: 32 }}
                >
                    {actions.map( ( action ) => {
                        return (
                            <SpeedDialAction
                                key={action.name}
                                icon={action.icon}
                                tooltipTitle={action.name}
                            />
                        )
                    } )}
                </SpeedDial>
            </section>
        </>
    );
}
