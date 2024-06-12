'use client';

import { useForm, Controller, type SubmitHandler } from 'react-hook-form';
import { addMedication } from '@/app/_lib/services/medicationService';
import { revalidateFetch } from '@/app/_lib/hooks/useFetch';
import styles from './MedicationForm.module.scss';
import type { Medication } from '@/app/_types';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';

export function MedicationForm() {
    const { control, handleSubmit, reset, formState: { errors } } = useForm<Medication>();

    const onSubmit: SubmitHandler<Medication> = async ( data ) => {
        try {
            const response = await addMedication( data );
            if ( response.ok ) {
                console.log( 'Medication successfully added to library!' );
                reset();
                revalidateFetch( `${process.env.NEXT_PUBLIC_APP_URL}/api/medications` );
            }
        } catch ( error ) {
            console.error( 'Failed add medication to library:', error );
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit( onSubmit )}>
            <Controller
                name="name"
                control={control}
                rules={{ required: "Name is required" }}
                render={( { field } ) => (
                    <TextField
                        label="Name"
                        className={styles.input}
                        {...field}
                        error={!!errors.name}
                        helperText={errors.name ? errors.name.message : ""}
                    />
                )}
            />
            <Controller
                name="totalDoses"
                control={control}
                rules={{ required: "Total doses is required" }}
                render={( { field } ) => (
                    <TextField
                        label="Number of doses per box"
                        className={styles.input}
                        {...field}
                        error={!!errors.totalDoses}
                        helperText={errors.totalDoses ? errors.totalDoses.message : ""}
                    />
                )}
            />
            <Controller
                name="doseUnit"
                control={control}
                rules={{ required: "Dose unit is required" }}
                render={( { field } ) => (
                    <TextField
                        label="Dose unit"
                        className={styles.input}
                        {...field}
                        error={!!errors.doseUnit}
                        helperText={errors.doseUnit ? errors.doseUnit.message : ""}
                    />
                )}
            />
            <Controller
                name="visualDescription"
                control={control}
                render={( { field } ) => (
                    <TextField
                        label="Visual description"
                        className={styles.input}
                        {...field}
                        error={!!errors.visualDescription}
                        helperText={errors.visualDescription ? errors.visualDescription.message : ""}
                    />
                )}
            />
            <Button
                className={styles.submitButton}
                type="submit"
                variant="contained"
                color="info"
                size="medium"
                startIcon={<SaveIcon />}
            >
                Add
            </Button>
        </form>
    );
}
