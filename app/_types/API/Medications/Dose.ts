import type { AdministeredDose } from './AdministeredDose';
import type { Medication } from './Medication';
import type { DoseStatus } from '../Enums/DoseStatus';
import type { Pet } from '../Pet/Pet';
import type { Day } from '../Plan/Day';
import type { User } from '../User/User';

export interface Dose {
    id: string;
    dayId: string;
    offset: number;
    medicationId: string;
    plannedAmount: number;
    givenAmount?: number | null;
    cumulativeAdjustment: number;
    status: DoseStatus;
    day: Day;
    medication: Medication;
    administeredDoses: AdministeredDose[];
}
