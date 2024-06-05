import { useFetch } from '@/app/_lib/hooks/useFetch';
import type { Day } from '@/app/_types';
import styles from './PlanView.module.scss';
import { useSearchParams } from 'next/navigation';

export function PlanView() {
    const petId = useSearchParams().get( 'id' );
    const { data, isLoading, isError } = useFetch<Day[]>( `${process.env.NEXT_PUBLIC_APP_URL}/api/pets/${petId && `plan?id=${petId}`}` )

    if ( isLoading ) return <div>loading data</div>

    if ( isError ) return <div>error loading data</div>

    return (
        <div className={styles.wrapper}>
            Data here {JSON.stringify( data )}
        </div>
    )
}
