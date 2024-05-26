'use client'
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { Pet as PetDetails, HidePetList } from '@/app/_types';
import styles from './petdetails.module.scss';

type Mode = 'add' | 'edit';

export function PetDetails( { hideDetailsScreen }: HidePetList ) {
    const [mode, setMode] = useState( 'add' );

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<PetDetails>();

    const onSubmit: SubmitHandler<PetDetails> = async ( data ) => {
        hideDetailsScreen();
        try {
            const response = await fetch( '/api/pets', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify( {
                    name: data.name,
                    age: data.age,
                    breed: data.breed,
                } )
            } );
            if ( response.ok ) {
                console.log( 'Pet added successfully!' );
            } else {
                console.error( 'Failed to add pet:', response.statusText );
            }

        } catch ( error ) {
            console.error( 'Error adding pet:', error );
        }
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit( onSubmit )}>
            <label>name</label>
            <input className={styles.input} {...register( 'name', { required: true } )} />
            <label>age</label>
            <input className={styles.input} {...register( 'age', { required: true } )} />
            <label>breed</label>
            <input className={styles.input} {...register( 'breed', { required: true } )} />
            <input className={styles.submitButton} type='submit' />
        </form>
    )
}
