import { forwardRef } from 'react';

import type { ModalProps } from '@/app/_types';

import styles from './Modal.module.scss';

export const Modal = forwardRef<HTMLDialogElement, ModalProps>( ( props, ref ) => {
    const { children, onClose } = props;
    return (
        <dialog ref={ref} className={styles.modal}>
            {children}
            <button onClick={onClose}>close</button>
        </dialog>
    );
} );

Modal.displayName = "Modal";
