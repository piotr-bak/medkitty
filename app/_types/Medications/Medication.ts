import type { DailyDose } from "./DailyDose";

export interface Medication {
    id: string;
    name: string;
    user: string;
    userId: string;
    totalDoses: number;
    doseUnit: string;
    dailyDoses: DailyDose[];
}
