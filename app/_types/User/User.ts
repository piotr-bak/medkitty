import type { DailyDose } from "../Medications/DailyDose";
import type { Pet } from "../Pet/Pet";
import type { PetInvitation } from "../Pet/PetInvitation";

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
    medicationPlan: DailyDose[];
}
