import type { MedicationPlan } from './MedicationPlan';

export interface Day {
    id: string;
    medicationPlanId: string;
    date: Date;
    medicationPlan: MedicationPlan;
    doses: [
        /* array of Dose objects */
    ];
}
