'use client';

import { useEffect } from 'react';
import { useFetch } from '@/app/_lib/hooks/useFetch';
import { addPet, updatePet } from '@/app/_lib/services/petService';
import type { Pet } from '@/app/_types';
import { useForm, type SubmitHandler } from 'react-hook-form';
import styles from './PetForm.module.scss';

export function PetForm( { petId }: { petId: string | null } ) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Pet>();
    const { data: currentPet, isError } = useFetch<Pet>(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/${petId && `pets?id=${petId}`}`,
    );

    useEffect( () => {
        if ( currentPet ) {
            reset( currentPet );
        }
    }, [currentPet, reset] );

    const onSubmit: SubmitHandler<Pet> = async ( data ) => {
        if ( petId ) {
            updatePet( data );
        } else {
            addPet( data );
        }
    };

    return (
        <>
            <form className={styles.form} onSubmit={handleSubmit( onSubmit )}>
                <label>name</label>
                <input
                    className={styles.input}
                    {...register( 'name', { required: true } )}
                    defaultValue={currentPet?.name || ''}
                />
                <label>species</label>
                <input
                    className={styles.input}
                    {...register( 'species', { required: true } )}
                    defaultValue={currentPet?.species || ''}
                />
                <label>breed</label>
                <input
                    className={styles.input}
                    {...register( 'breed', { required: true } )}
                    defaultValue={currentPet?.breed || ''}
                />
                <label>sex</label>
                <select
                    className={styles.input}
                    {...register( 'sex', { required: true } )}
                    defaultValue={currentPet?.sex || ''}
                >
                    <option value="female">female</option>
                    <option value="male">male</option>
                </select>
                <input className={styles.submitButton} type="submit" />
            </form>
        </>
    );
}
