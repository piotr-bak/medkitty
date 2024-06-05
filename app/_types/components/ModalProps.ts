import type { ReactNode } from "react";

export interface ModalProps {
    title: string;
    children: ReactNode;
    onClose: () => void;
}
