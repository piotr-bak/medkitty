import { PetList } from '@/app/_components/PetList/PetList';
import styles from './page.module.scss';
import Link from 'next/link';

export default function Page() {

    return (
        <div className={styles.dashboard} >
            <PetList />
            <Link href={'/dashboard/pet'}>
                <button className={styles.buttonAdd} aria-label="add pet">{'+'}</button>
            </Link>
        </div>
    )
}
