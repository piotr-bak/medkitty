import { forwardRef } from 'react';
import type { ModalProps } from '@/app/_types';
import styles from './MedModal.module.scss';

export const Modal = forwardRef<HTMLDialogElement, ModalProps>( ( props, ref ) => {
    const { title, children, onClose } = props;
    return (
        <dialog ref={ref} className={styles.modal}>
            <h2>{title}</h2>
            {children}
            <button onClick={onClose}>close</button>
        </dialog>
    )
} );
