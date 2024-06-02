export interface Pet {
    id: string;
    name: string;
    species: string;
    breed: string;
    sex: "female" | "male";
    owners: string[];
    medicationSchedules: string[];
}
