'use client';

import { useEffect } from 'react';
import { useFetch } from '@/app/_lib/hooks/useFetch';
import { addPet, updatePet } from '@/app/_lib/services/petService';
import type { Pet } from '@/app/_types';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import styles from './PetForm.module.scss';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save'

export function PetForm( { petId }: { petId: string | null } ) {
    const {
        control,
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
            { console.log( 'pet data in Submit', JSON.stringify( data ) ) }
            updatePet( data );
        } else {
            addPet( data );
        }
    };

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
                            value={field.value || ''} // Add value prop
                            onChange={field.onChange} // Add onChange prop
                            onBlur={field.onBlur} // Add onBlur prop
                            error={!!errors.name} // Add error prop if needed
                            helperText={errors.name ? "Name is required" : ""} // Add helperText prop if needed
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
                            value={field.value || ''} // Add value prop
                            onChange={field.onChange} // Add onChange prop
                            onBlur={field.onBlur} // Add onBlur prop
                            error={!!errors.name} // Add error prop if needed
                            helperText={errors.name ? "Species is required" : ""} // Add helperText prop if needed
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
                            value={field.value || ''} // Add value prop
                            onChange={field.onChange} // Add onChange prop
                            onBlur={field.onBlur} // Add onBlur prop
                            error={!!errors.name} // Add error prop if needed
                            helperText={errors.name ? "Breed is required" : ""} // Add helperText prop if needed
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
                            value={field.value || ''} // Add value prop
                            onChange={field.onChange} // Add onChange prop
                            onBlur={field.onBlur} // Add onBlur prop
                            error={!!errors.name} // Add error prop if needed
                            helperText={errors.name ? "Breed is required" : ""} // Add helperText prop if needed
                        >
                            <MenuItem value='female'>female</MenuItem>
                            <MenuItem value='male'>male</MenuItem>
                        </TextField> )}
                />
                <Button
                    type="submit"
                    variant="outlined"
                    size="small"
                    startIcon={<SaveIcon />}
                >Save</Button>
            </form >
        </>
    );
}
