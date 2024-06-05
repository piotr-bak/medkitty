import type { Dose } from "./Dose";
import type { Medication } from "./Medication";

export interface AdministeredDose {
    id: string;
    doseId: string;
    medicationId: string;
    time: Date;
    dose: Dose;
    medication: Medication;
}
