import type { DoseFormValues } from '@/app/_types';
import type { MedicationPlan } from '@/app/_types/API/Plan/MedicationPlan';

export async function createPlan(
    petId: string,
    data: MedicationPlan,
): Promise<Response> {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_APP_URL}/api/pets/plan?id=${petId}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify( data ),
            },
        );

        if ( !response.ok ) {
            throw new Error( `HTTP error! status: ${response.status}` );
        }

        return response;
    } catch ( error ) {
        console.error( 'Error adding schedule:', error );
        throw error;
    }
}

export async function createDose(
    data: DoseFormValues | string,
): Promise<Response> {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_APP_URL}/api/medications/dose`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify( data ),
            },
        );

        if ( !response.ok ) {
            throw new Error( `HTTP error! status: ${response.status}` );
        }

        return response;
    } catch ( error ) {
        console.error( 'Error adding schedule:', error );
        throw error;
    }
}
