'use client'
import { useForm, type SubmitHandler } from "react-hook-form";
import type { Pet as Inputs } from '@/app/_types';
import styles from './petdetails.module.scss';

export function PetDetails() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = ( data ) => console.log( data );

    return (
        <form className={styles.form} onSubmit={handleSubmit( onSubmit )}>
            <label>name</label>
            <input {...register( 'name', { required: true } )} />
            <label>age</label>
            <input {...register( 'age', { required: true } )} />
            <label>breed</label>
            <input {...register( 'breed', { required: true } )} />
            <input type='submit' />
        </form>
    )
}
