'use client'
import { Dial } from '@/app/_components/Dial/Dial';
import { PetList } from '@/app/_components/PetList/PetList';
import illustration from '../../_assets/vet-illustration.svg'
import AddIcon from '@mui/icons-material/Add';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import MedicationIcon from '@mui/icons-material/Medication';
import PetsIcon from '@mui/icons-material/Pets';

export default function Page() {
    const actions = [
        { icon: <AddIcon />, name: 'Add a new pet', target: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/pet` },
        { icon: <MedicationIcon />, name: 'Medications', target: undefined },
        { icon: <GroupAddIcon />, name: 'Invites', target: undefined },
    ];

    return (
        <>
            <section>
                <PetList />
                <Dial actions={actions} openIcon={<PetsIcon />} />
            </section>
        </>
    );
}
