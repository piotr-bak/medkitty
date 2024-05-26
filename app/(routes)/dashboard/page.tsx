'use client'
import { PetList } from '@/app/_components/PetList/PetList';
import styles from './page.module.scss';
import { PetDetails } from '@/app/_components/PetDetails/PetDetails';
import { useState } from 'react';

export default function Dashboard() {
    const [showPetDetails, setShowPetDetails] = useState( false );
    const [refreshPets, setRefreshPets] = useState( false );

    const showDetailsScreen = () => {
        setShowPetDetails( true );
    }

    const hideDetailsScreen = () => {
        setShowPetDetails( false );
        setRefreshPets( prev => !prev );
    }



    return (
        <div className={styles.dashboard} >
            {showPetDetails ? <PetDetails hideDetailsScreen={hideDetailsScreen} /> : <PetList showDetailsScreen={showDetailsScreen} refreshPets={refreshPets} />}
        </div>
    )
}
