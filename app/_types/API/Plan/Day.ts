import type { MedicationPlan } from './MedicationPlan';
import type { Dose } from '../Medications/Dose';

export interface Day {
    id: string;
    medicationPlanId: string;
    date: Date;
    medicationPlan: MedicationPlan;
    doses: Dose[];
}
