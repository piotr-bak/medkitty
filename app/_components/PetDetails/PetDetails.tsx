'use client'
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { addPet, updatePet } from "@/app/_utils/petService";
import type { SubmitHandler } from "react-hook-form";
import type { Pet } from '@/app/_types';
import styles from './PetDetails.module.scss';


export function PetDetails( { petId }: { petId: string | null } ) {
    const [currentPet, setCurrentPet] = useState<Pet | undefined>( undefined );
    const { register, handleSubmit, reset, formState: { errors } } = useForm<Pet>();

    useEffect( () => {
        const fetchPet = async () => {
            if ( petId != null ) {
                try {
                    const response = await fetch( `${process.env.NEXT_PUBLIC_APP_URL}/api/${petId && `pets?id=${petId}`}` );
                    if ( !response.ok ) {
                        throw new Error( `HTTP error! status: ${response.status}` );
                    }
                    const data = await response.json();
                    setCurrentPet( data );
                } catch ( error ) {
                    console.error( "Failed to fetch pets:", error );
                }
            } else {
                setCurrentPet( undefined );
            }
        };
        fetchPet();
    }, [petId] );

    useEffect( () => {
        if ( currentPet ) {
            reset( currentPet );
        }
    }, [currentPet, reset] )

    const onSubmit: SubmitHandler<Pet> = async ( data ) => {
        if ( petId ) {
            updatePet( data );
        } else {
            addPet( data );
        }
    }

    return (
        <>
            <form className={styles.form} onSubmit={handleSubmit( onSubmit )}>
                <label>name</label>
                <input className={styles.input} {...register( 'name', { required: true } )} defaultValue={currentPet?.name || ''} />
                <label>species</label>
                <input className={styles.input} {...register( 'species', { required: true } )} defaultValue={currentPet?.species || ''} />
                <label>breed</label>
                <input className={styles.input} {...register( 'breed', { required: true } )} defaultValue={currentPet?.breed || ''} />
                <label>sex</label>
                <select className={styles.input} {...register( 'sex', { required: true } )} defaultValue={currentPet?.sex}>
                    <option value='female'>female</option>
                    <option value='male'>male</option>
                </select>
                <input className={styles.submitButton} type='submit' />
            </form>
        </>
    )
}
