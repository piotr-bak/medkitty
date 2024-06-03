import { AnimalSex } from "./enums";

export interface Pet {
    id: string;
    name: string;
    species: string;
    breed: string;
    sex: AnimalSex;
    owners: string[];
    medicationSchedules: string[];
}
