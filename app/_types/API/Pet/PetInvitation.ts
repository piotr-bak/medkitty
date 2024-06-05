import type { InvitationStatus } from "../Enums/InvitationStatus";
import type { User } from "../User/User";
import type { Pet } from "./Pet";

export interface PetInvitation {
    id: string;
    petId: string;
    userId: string;
    status: InvitationStatus;
    pet: Pet;
    user: User;
}
