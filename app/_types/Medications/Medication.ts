import type { DailyDose } from "./DailyDose";

export interface Medication {
    id: string;
    name: string;
    totalDoses: number;
    doseUnit: string;
    dailyDoses: DailyDose[];
}
