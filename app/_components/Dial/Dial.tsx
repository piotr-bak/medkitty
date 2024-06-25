'use client'

import type { DialProps, DialTarget } from '@/app/_types';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { useRouter } from 'next/navigation';
import styles from './Dial.module.scss';

export function Dial( { actions, openIcon }: DialProps ) {
    const router = useRouter();

    const handleActionClick = ( target: DialTarget['target'] ) => {
        if ( typeof target === 'function' ) {
            target();
        }
        if ( typeof target === 'string' ) {
            router.push( target );
        }
    }
    
    return (
        <SpeedDial
            ariaLabel='MedKitty main menu'
            icon={<SpeedDialIcon openIcon={openIcon} />}
            className={styles.dial}
        >
            {actions.map( ( action ) => {
                return (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={() => handleActionClick( action.target )}
                    />
                )
            } )}
        </SpeedDial>
    )
}
