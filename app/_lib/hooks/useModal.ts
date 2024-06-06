import { useRef } from "react";

export function useModal() {
    const ref = useRef<HTMLDialogElement>(null);
    const openModal = () => {
        if (ref.current) {
            ref.current?.showModal();
            ref.current.classList.add("active");
        }
    };
    const onClose = () => {
        if (ref.current) {
            ref.current.close();
            ref.current.classList.remove("active");
        }
    };

    return { ref, openModal, onClose };
}
