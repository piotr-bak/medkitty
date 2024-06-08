'use client';

import { useEffect } from 'react';
import { createPlan } from '@/app/_lib/services/schedulingService';
import type { MedicationPlan } from '@/app/_types/API/Plan/MedicationPlan';
import { useSearchParams } from 'next/navigation';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import styles from './PlanForm.module.scss';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';

export function PlanForm() {
    const {
        control,
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
        <form className={styles.form} onSubmit={handleSubmit( onSubmit )}>
            <Controller
                name="name"
                control={control}
                render={( { field } ) => (
                    <TextField
                        label="Treatement plan name"
                        className={styles.input}
                        {...field}
                        value={field.value || ''}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        error={!!errors.name}
                        helperText={errors.name ? "Name is required" : ""}
                    />
                )}
            />
            <Controller
                name="startDate"
                control={control}
                render={( { field } ) => (
                    <TextField
                        label="Start Date"
                        type="date"
                        className={styles.input}
                        {...field}
                        value={field.value || ''}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        error={!!errors.startDate}
                        helperText={errors.startDate ? "Start date is required" : ""}
                    />
                )}
            />
            <Controller
                name="endDate"
                control={control}
                render={( { field } ) => (
                    <TextField
                        label="End Date"
                        type="date"
                        className={styles.input}
                        {...field}
                        value={field.value || ''}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        error={!!errors.endDate}
                        helperText={errors.endDate ? "End date is required" : ""}
                    />
                )}
            />
            <Button
                type="submit"
                variant="contained"
                color="info"
                size="medium"
                className={styles.submitButton}
                startIcon={<SaveIcon />}
            >
                Create Plan
            </Button>
        </form>
    );
}
