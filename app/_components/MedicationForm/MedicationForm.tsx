import { useForm } from 'react-hook-form';
import styles from './MedicationForm.module.scss';
import type { Medication } from '@/app/_types';
import type { SubmitHandler } from 'react-hook-form';
import { addMedication } from '@/app/_lib/services/medicationService';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Button from '@mui/material/Button';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export function MedicationForm() {

    const onSubmit: SubmitHandler<Medication> = async ( data ) => {
        try {
            const response = await addMedication( data );
            if ( response.ok ) {
                console.log( 'Medication successfully added to library!' );
                reset();
            }
        } catch ( error ) {
            console.error( 'Failed add medication to library:', error );
        }
    };

    const { register, handleSubmit, reset, formState: { errors } } = useForm<Medication>();
    return (
        <form className={styles.form} onSubmit={handleSubmit( onSubmit )}>
            <label>name</label>
            <input
                className={styles.input}
                {...register( 'name', { required: true } )}
            />
            <label>number of doses per box</label>
            <input
                className={styles.input}
                {...register( 'totalDoses', { required: true } )}
            />
            <label>dose unit</label>
            <input
                className={styles.input}
                {...register( 'doseUnit', { required: true } )}
            />
            <label>visual description</label>
            <input
                className={styles.input}
                {...register( 'visualDescription', { required: false } )}
            />
            <button type='submit'>add</button>
        </form>
    );
}
