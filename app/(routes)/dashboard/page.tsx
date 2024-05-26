import { PetList } from '@/app/_components/PetList/PetList';
import styles from './page.module.scss';
import { PetDetails } from '@/app/_components/PetDetails/PetDetails';

export default function Dashboard() {
    return (
        <div className={styles.dashboard} >
            <PetList />
            <PetDetails />
        </div>
    )
}
