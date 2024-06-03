import type { Pet } from "../Pet/Pet";
import type { User } from "../User/User";
import type { Medication } from "./Medication";

export interface DailyDose {
    id: string;
    petId: string;
    userId: string;
    medicationId: string;
    dosage: number;
    intervalMinutes: number;
    firstAdministration?: Date;
    finalAdministration?: Date;
    mostRecentAdministration?: Date;
    nextAdministration?: Date;
    cumulativeAdjustment: number;
    administeredCount: number;
    pet: Pet;
    user: User;
    medication: Medication;
}
