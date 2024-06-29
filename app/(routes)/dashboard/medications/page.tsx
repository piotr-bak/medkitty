import { MedicationDetails } from '@/app/_components/MedicationDetails/MedicationDetails';
import { MedicationList } from '@/app/_components/MedicationList/MedicationList';

import styles from './page.module.scss';

export default function Page() {
    return (
        <main>
            <MedicationList />
            <MedicationDetails />
        </main>
    )
}
