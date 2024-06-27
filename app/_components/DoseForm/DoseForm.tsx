'use client'

import type { SubmitHandler } from 'react-hook-form';

import { useEffect, useState } from 'react';

import AddIcon from '@mui/icons-material/Add'
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { useSearchParams } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';

import { revalidateFetch, useFetch } from '@/app/_lib/hooks/useFetch';
import { createDose } from '@/app/_lib/services/medicationService';
import type { Medication } from '@/app/_types';
import type { DoseFormValues } from '@/app/_types';



import styles from './DoseForm.module.scss';
import { MedicationForm } from '../MedicationForm/MedicationForm';


export function DoseForm( { dayId }: { dayId: string } ) {
    const { data: availableMeds, isLoading, isError } = useFetch<Medication[]>( `${process.env.NEXT_PUBLIC_APP_URL}/api/medications` );
    const petId = useSearchParams().get( 'id' );
    const { control, handleSubmit, watch, reset, formState: { errors }, } = useForm<DoseFormValues>( {
        defaultValues: {
            medicationId: '',
            amount: 0,
            time: ''
        }
    } );
    const [doseEnabled, setDoseEnabled] = useState( false );
    const [timeEnabled, setTimeEnabled] = useState( false );
    const [doseUnit, setDoseUnit] = useState( 'Enter dose' );

    const selectedMedication = watch( 'medicationId' );
    const selectedAmount = watch( 'amount' );

    useEffect( () => {
        if ( selectedMedication ) {
            const selectedMed = availableMeds?.find( med => med.id === selectedMedication );
            setDoseEnabled( true );
            setDoseUnit( `${selectedMed?.doseUnit.slice( -1 ) === 's' ? selectedMed?.doseUnit : `${selectedMed?.doseUnit}s`}` );
        } else {
            setDoseEnabled( false );
            setDoseUnit( '' );
            setTimeEnabled( false );
        }
    }, [selectedMedication, availableMeds] );

    useEffect( () => {
        if ( selectedAmount ) {
            setTimeEnabled( true );
        } else {
            setTimeEnabled( false );
        }
    }, [selectedAmount] );

    const onSubmit: SubmitHandler<DoseFormValues> = async ( data ) => {
        if ( petId ) {
            try {
                const doseData = { ...data, dayId };
                const response = await createDose( doseData );
                if ( response.ok ) {
                    console.log( 'Dose added successfully!' );
                    reset();
                    revalidateFetch( `${process.env.NEXT_PUBLIC_APP_URL}/api/pets/${petId && `plan?id=${petId}`}` );
                }
            } catch ( error ) {
                console.error( 'Failed to add dose to schedule:', error );
            }
        } else {
            console.error( 'Pet ID or Day ID is missing' );
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit( onSubmit )} className={styles.form}>
                <Controller
                    name="medicationId"
                    control={control}
                    rules={{ required: true }}
                    render={( { field } ) => (
                        <select className={styles.selectInput} {...field}>
                            <option value=''>Please select a medication</option>
                            {availableMeds && availableMeds.map( medication => (
                                <option key={medication.id} value={medication.id}>{medication.name}</option>
                            ) )}
                        </select>
                    )}
                />
                <Controller
                    name="amount"
                    control={control}
                    rules={{ required: true }}
                    render={( { field } ) => (
                        <TextField
                            label={`Medication dose ${doseUnit && `(${doseUnit})`}`}
                            type="number"
                            className={styles.input}
                            placeholder='Enter dose'
                            {...field}
                            value={field.value || ''}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            disabled={!doseEnabled}
                        />
                    )}
                />
                <Controller
                    name="time"
                    control={control}
                    rules={{ required: true }}
                    render={( { field } ) => (
                        <TextField
                            label="Administration time"
                            type="time"
                            className={styles.input}
                            {...field}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            disabled={!timeEnabled}
                        />
                    )}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="info"
                    size="medium"
                    className={styles.submitButton}
                    startIcon={<AddIcon />}
                >Add to</Button>
            </form >
            <MedicationForm />
        </>
    );
}
