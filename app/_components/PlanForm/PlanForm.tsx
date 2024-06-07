import { createPlan } from '@/app/_lib/services/schedulingService';
import type { MedicationPlan } from '@/app/_types/API/Plan/MedicationPlan';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import styles from './PlanForm.module.scss';

export function PlanForm() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<MedicationPlan>();
    const petId = useSearchParams().get( 'id' );

    const onSubmit: SubmitHandler<MedicationPlan> = async ( data ) => {
        if ( petId ) {
            try {
                const response = await createPlan( petId, data );
                if ( response.ok ) {
                    console.log( 'Schedule created successfully!' );
                    reset(); // Optionally reset the form
                }
            } catch ( error ) {
                console.error( 'Failed to create schedule:', error );
            }
        } else {
            console.error( 'Pet ID is missing' );
        }
    };

    return (
        <form onSubmit={handleSubmit( onSubmit )}>
            <label>name</label>
            <input
                className={styles.input}
                {...register( 'name', { required: true } )}
            />
            <br />
            <label>start date</label>
            <input
                type="date"
                className={styles.input}
                {...register( 'startDate', { required: true } )}
            />
            <br />
            <label>end date</label>
            <input
                type="date"
                className={styles.input}
                {...register( 'endDate', { required: true } )}
            />
            <br />
            <button type="submit">create a plan</button>
        </form>
    );
}
