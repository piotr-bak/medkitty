'use client'

import PetsIcon from '@mui/icons-material/Pets';
import AddIcon from '@mui/icons-material/Add';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import MedicationIcon from '@mui/icons-material/Medication';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { useRouter } from 'next/navigation';
import styles from './Dial.module.scss';

const actions = [
    { icon: <AddIcon />, name: 'Add a new pet', href: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/pet` },
    { icon: <MedicationIcon />, name: 'Medications' },
    { icon: <GroupAddIcon />, name: 'Invites' },
];


export function Dial() {
    const router = useRouter();

    const handleActionClick = ( href: string ) => {
        if ( href ) {
            router.push( href );
        }
    }
    return (
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
                        onClick={() => handleActionClick( action.href as string )}
                    />
                )
            } )}
        </SpeedDial>
    )
}