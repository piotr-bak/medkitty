import type { Dose } from "../API/Medications/Dose";

export interface DoseCardProps extends React.HTMLAttributes<HTMLDivElement> {
    doseData: Dose;
}
