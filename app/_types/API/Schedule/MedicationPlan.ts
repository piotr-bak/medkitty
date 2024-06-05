import type { Pet } from "../Pet/Pet";
import type { User } from "../User/User";
import type { Day } from "./Day";

export interface MedicationPlan {
    id: string;
    petId: string;
    userId: string;
    name?: string;
    startDate: Date;
    endDate: Date;
    user: User[];
    pet: Pet[];
    days: Day[];
}
