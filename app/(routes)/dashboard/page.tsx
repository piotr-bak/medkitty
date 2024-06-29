'use client'
import AddIcon from '@mui/icons-material/Add';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import MedicationIcon from '@mui/icons-material/Medication';
import PetsIcon from '@mui/icons-material/Pets';


import { Dial } from '@/app/_components/Dial/Dial';
import { DoseSummary } from '@/app/_components/DoseSummary/DoseSummary';
import { PetList } from '@/app/_components/PetList/PetList';

import styles from '../dashboard/page.module.scss'

export default function Page() {
    const actions = [
        { icon: <AddIcon />, name: 'Add a new pet', target: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/pet` },
        { icon: <MedicationIcon />, name: 'Medications', target: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/medications` },
        { icon: <GroupAddIcon />, name: 'Invites', target: undefined },
    ];

    return (
        <main>
            <section className={styles.upper}>
                <div className={styles.topbar}>
                    <h2>today</h2>
                </div>
                <DoseSummary />
            </section>
            <section className={styles.lower}>
                <div className={styles.topbar}>
                    <h2>your pets</h2>
                </div>
                <PetList />
                <Dial actions={actions} openIcon={<PetsIcon />} />
            </section>
        </main>
    );
}
