import type { DoseStatus } from "../Enums/DoseStatus";
import type { Pet } from "../Pet/Pet";
import type { Day } from "../Schedule/Day";
import type { User } from "../User/User";
import type { AdministeredDose } from "./AdministeredDose";
import type { Medication } from "./Medication";

export interface Dose {
    id: string;
    petId: string;
    offset: number;
    medicationId: string;
    cumulativeAdjustment: number;
    status: DoseStatus;
    day: Day;
    user: User;
    medication: Medication;
    administeredDoses: AdministeredDose[];
}
