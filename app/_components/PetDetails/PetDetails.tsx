import type { PetFormProps } from '@/app/_types';
import type { Pet } from '@/app/_types';
import IconButton from '@mui/material/IconButton';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import styles from './PetDetails.module.scss';
import { useFetch } from '@/app/_lib/hooks/useFetch';
import { useState } from 'react';

export function PetDetails( { petId }: PetFormProps ) {
    const { data: currentPet, isLoading, isError } = useFetch<Pet>(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/${petId && `pets?id=${petId}`}`,
    );

    const [drawerOpen, setDrawerOpen] = useState( false );

    return (
        <>
            <IconButton
                className={styles.puller}
                onClick={() => setDrawerOpen( true )}
            >
                <MoreHorizIcon />
            </IconButton>
            <SwipeableDrawer
                anchor="left"
                open={drawerOpen}
                onClose={() => setDrawerOpen( false )}
                onOpen={() => setDrawerOpen( true )}
            >
                {currentPet && (
                    <aside className={styles.container}>
                        <h2 className={styles.name}>{currentPet.name}</h2>
                        <h3 className={styles.details}>{`${currentPet.sex} ${currentPet.breed} ${currentPet.species}`}</h3>
                        <p className={styles.owner}>{`owner${( currentPet.owners?.length > 1 ) ? 's' : ''}:`}</p>
                        <ul>
                            {currentPet.owners?.map( ( owner ) => {
                                return (
                                    <li key={crypto.randomUUID()}>{owner.name}</li>
                                )
                            } )}
                        </ul>
                        {( currentPet.caretakers.length > 0 ) && (
                            <>
                                <p className={styles.caretaker}>also taken care by:</p>
                                <ul>
                                    {currentPet.caretakers?.map( ( caretaker ) => {
                                        return (
                                            <li key={crypto.randomUUID()}>{caretaker.name}</li>
                                        )
                                    } )}
                                </ul>
                            </>
                        )}
                    </aside>
                )}
            </SwipeableDrawer>
        </>
    )
}
