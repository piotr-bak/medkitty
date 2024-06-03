import type { AnimalSex } from "../Enums/AnimalSex";
import type { DailyDose } from "../Medications/DailyDose";
import type { PetInvitation } from "./PetInvitation";
import type { User } from "../User/User";

export interface Pet {
    id: string;
    name: string;
    species: string;
    breed: string;
    sex: AnimalSex;
    owners: User[];
    caretakers: User[];
    dailyDoses: DailyDose[];
    invitations: PetInvitation[];
}
