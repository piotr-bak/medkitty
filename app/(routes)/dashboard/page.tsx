'use client'
import { PetList } from '@/app/_components/PetList/PetList';
import styles from './page.module.scss';

export default function Page() {

    return (
        <div className={styles.dashboard} >
            <PetList />
        </div>
    )
}
