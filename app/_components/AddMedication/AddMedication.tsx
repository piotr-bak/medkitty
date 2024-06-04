
import { useForm } from 'react-hook-form';
import { addMedication } from '@/app/_lib/utils/medicationService';
import type { Medication } from '@/app/_types';
import type { SubmitHandler } from 'react-hook-form';
import styles from './AddMedication.module.scss';

export function AddMedication() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<Medication>();

    const onSubmit: SubmitHandler<Medication> = async ( data ) => {
        addMedication( data );
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit( onSubmit )}>
            <label>name of medicine</label>
            <input className={styles.input} {...register( 'name', { required: true } )} />
            <label>doses per package</label>
            <input className={styles.input} type='number' {...register( 'totalDoses', { required: true } )} />
            <label>dose unit</label>
            <input className={styles.input} {...register( 'doseUnit', { required: true } )} />
            <input className={styles.submitButton} type='submit' />
        </form>
    )
}
