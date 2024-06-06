import type { PetInvitation } from "./PetInvitation";
import type { User } from "../User/User";
import type { MedicationPlan } from "../Plan/MedicationPlan";

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
