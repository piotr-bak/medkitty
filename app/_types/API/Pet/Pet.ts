import type { MedicationPlan } from '../Plan/MedicationPlan';
import type { User } from '../User/User';
import type { PetInvitation } from './PetInvitation';

export interface Pet {
    id: string;
    name: string;
    species: string;
    breed: string;
    sex: string;
    owners: User[];
    caretakers: User[];
    medicationPlans: MedicationPlan[];
    invitations: PetInvitation[];
}
