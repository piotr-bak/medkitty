export type PetFormMode = 'view' | 'edit';

export interface PetFormProps {
    petId: string | null;
    mode: PetFormMode;
}
