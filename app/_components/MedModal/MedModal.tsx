import { forwardRef } from 'react';
import { AddMedication } from '../AddMedication/AddMedication';
import styles from './MedModal.module.scss';


export const MedModal = forwardRef<HTMLDialogElement, { onClose: () => void }>( ( props, ref ) => {
    const { onClose } = props;
    return (
        <dialog ref={ref} className={styles.modal}>
            <h3>Add Medication</h3>
            <AddMedication />
            <button onClick={onClose}>close!</button>
        </dialog>
    )
} );
