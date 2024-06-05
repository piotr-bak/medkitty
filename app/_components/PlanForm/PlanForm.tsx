
import type { MedicationPlan } from '@/app/_types/API/Schedule/MedicationPlan';
import styles from './PlanForm.module.scss';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { createPlan } from '@/app/_lib/utils/schedulingService';
import { useSearchParams } from 'next/navigation';

export function PlanForm() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<MedicationPlan>();
    const searchParams = useSearchParams();
    const petId = searchParams.get( 'id' );

    const onSubmit: SubmitHandler<MedicationPlan> = async ( data ) => {
        if ( petId ) {
            try {
                const response = await createPlan( petId, data );
                if ( response.ok ) {
                    console.log( "Schedule created successfully!" );
                    reset(); // Optionally reset the form
                }
            } catch ( error ) {
                console.error( "Failed to create schedule:", error );
            }
        } else {
            console.error( "Pet ID is missing" );
        }
    }

    return (
        <form onSubmit={handleSubmit( onSubmit )}>
            <label>name</label>
            <input className={styles.input} {...register( 'name', { required: true } )} />
            <label>start date</label>
            <input type='date' className={styles.input} {...register( 'startDate', { required: true } )} />
            <label>end date</label>
            <input type='date' className={styles.input} {...register( 'endDate', { required: true } )} />
            <button type='submit'>create a plan</button>
        </form>
    )
}
