import type { AdministeredDose } from './AdministeredDose';
import type { Dose } from './Dose';

export interface Medication {
    id: string;
    name: string;
    totalDoses: number;
    doseUnit: string;
    visualDescription?: string;
    user: string;
    userId: string;
    doses: Dose[];
    administeredDoses: AdministeredDose[];
}
