'use client';

import { useEffect } from 'react';
import { revalidateFetch, useFetch } from '@/app/_lib/hooks/useFetch';
import { addPet, deletePet, updatePet } from '@/app/_lib/services/petService';
import type { Pet } from '@/app/_types';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import styles from './PetForm.module.scss';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useRouter } from 'next/navigation';
import type { PetFormProps } from '@/app/_types';

export function PetForm( { petId, mode }: PetFormProps ) {
    const {
        control,
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Pet>();

    const router = useRouter();

    const { data: currentPet, isLoading, isError } = useFetch<Pet>(
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
            const newPetId = await addPet( data );
            console.log( 'New pet', newPetId );
            router.push( `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/pet?id=${newPetId}` )
        }
        revalidateFetch( '/api/pets' );
    };

    const handleDelete = async () => {
        if ( petId ) {
            const deleteComplete = await deletePet( petId );
            if ( deleteComplete ) {
                revalidateFetch( '/api/pets' );
                router.push( `${process.env.NEXT_PUBLIC_APP_URL}/dashboard` );
            }
        }
    }


    if ( isLoading ) return (
        <div className={styles.placeholder}>
            <CircularProgress />
        </div>
    )

    return (
        <>
            <form className={styles.form} onSubmit={handleSubmit( onSubmit )}>
                <Controller
                    name="name"
                    control={control}
                    render={( { field } ) => (
                        <TextField
                            label="Name"
                            className={styles.input}
                            {...field}
                            value={field.value || ''}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            error={!!errors.name}
                            helperText={errors.name ? "Name is required" : ""}
                        /> )}
                />
                <Controller
                    name="species"
                    control={control}
                    render={( { field } ) => (
                        <TextField
                            label="Species"
                            className={styles.input}
                            {...field}
                            value={field.value || ''}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            error={!!errors.name}
                            helperText={errors.name ? "Species is required" : ""}
                        /> )}
                />
                <Controller
                    name="breed"
                    control={control}
                    render={( { field } ) => (
                        <TextField
                            label="Breed"
                            className={styles.input}
                            {...field}
                            value={field.value || ''}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            error={!!errors.name}
                            helperText={errors.name ? "Breed is required" : ""}
                        /> )}
                />
                <Controller
                    name="sex"
                    control={control}
                    render={( { field } ) => (
                        <TextField
                            label="Sex"
                            select
                            className={styles.input}
                            {...field}
                            value={field.value || ''}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            error={!!errors.name}
                            helperText={errors.name ? "Breed is required" : ""}
                        >
                            <MenuItem value='female'>female</MenuItem>
                            <MenuItem value='male'>male</MenuItem>
                        </TextField> )}
                />
                <div className={styles.bottomPanel}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="info"
                        size="medium"
                        className={styles.submitButton}
                        startIcon={<SaveIcon />}
                    >Save</Button>
                    {( mode === 'edit' ) &&
                        <Button
                            onClick={handleDelete}
                            variant="contained"
                            color="error"
                            size="medium"
                            className={styles.submitButton}
                            startIcon={<HighlightOffIcon />}
                        >Delete</Button>
                    }
                </div>
            </form >
        </>
    );
}
