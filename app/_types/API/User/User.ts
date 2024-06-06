import type { Medication } from "../Medications/Medication";
import type { Pet } from "../Pet/Pet";
import type { PetInvitation } from "../Pet/PetInvitation";
import type { MedicationPlan } from "../Plan/MedicationPlan";

export interface User {
    id: string;
    foreignId: string;
    name?: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    ownedPets: Pet[];
    caretakenPets: Pet[];
    petInvitations: PetInvitation[];
    medicationPlan: MedicationPlan[];
    availableMedications: Medication[];
}
