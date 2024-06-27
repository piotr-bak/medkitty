import { useFetch } from '@/app/_lib/hooks/useFetch';

import styles from './DailySchedule.module.scss';
import { DoseCard } from '../DoseCard/DoseCard';

export function DailySchedule() {
    const { data, isError } = useFetch<any>( '/api/summary' );
    return (
        <div>
            <h1>summary</h1>
            {JSON.stringify( data )}
        </div>
    )
}
