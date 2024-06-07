'use client'

import type { Medication } from '@/app/_types';
import type { DoseFormValues } from '@/app/_types';
import type { SubmitHandler } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useSearchParams } from 'next/navigation';
import { useFetch } from '@/app/_lib/hooks/useFetch';
import { createDose } from '@/app/_lib/services/schedulingService';
import styles from './DoseForm.module.scss';
import { MedicationForm } from '../MedicationForm/MedicationForm';

export function DoseForm( { dayId }: { dayId: string } ) {
    const { data: availableMeds, isLoading, isError } = useFetch<Medication[]>( `${process.env.NEXT_PUBLIC_APP_URL}/api/medications` );
    const petId = useSearchParams().get( 'id' );
    const { control, handleSubmit, watch, reset } = useForm<DoseFormValues>( {
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
            setDoseUnit( `${selectedMed?.doseUnit[-1] === 's' ? selectedMed?.doseUnit : `${selectedMed?.doseUnit}s`}` );
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
                data = { dayId, ...data };
                const response = await createDose( data );
                if ( response.ok ) {
                    console.log( 'Dose added successfully!' );
                    reset(); // Optionally reset the form
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
                <label>Medication name:</label>
                <Controller
                    name="medicationId"
                    control={control}
                    rules={{ required: true }}
                    render={( { field } ) => (
                        <select className={styles.input} {...field}>
                            <option value=''>Please select a medication</option>
                            {availableMeds && availableMeds.map( medication => (
                                <option key={medication.id} value={medication.id}>{medication.name}</option>
                            ) )}
                        </select>
                    )}
                />
                <label>Medication dose {doseUnit && `(${doseUnit})`}:</label>
                <Controller
                    name="amount"
                    control={control}
                    rules={{ required: true }}
                    render={( { field } ) => (
                        <input
                            type="number"
                            step="0.05"
                            className={styles.input}
                            placeholder='Enter dose'
                            {...field}
                            disabled={!doseEnabled}
                        />
                    )}
                />
                <label>Administration time:</label>
                <Controller
                    name="time"
                    control={control}
                    rules={{ required: true }}
                    render={( { field } ) => (
                        <input
                            type="time"
                            className={styles.input}
                            {...field}
                            disabled={!timeEnabled}
                        />
                    )}
                />
                <button type="submit">Submit</button>
            </form>
            <MedicationForm />
        </>
    );
}
