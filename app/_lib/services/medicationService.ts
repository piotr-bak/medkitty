import type { Medication } from '../../_types';

import type { DoseFormValues } from '@/app/_types';

export async function addMedication( data: Medication ): Promise<Response> {
    try {
        const response = await fetch( `${process.env.NEXT_PUBLIC_APP_URL}/api/medications`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify( data ),
        } );

        if ( !response.ok ) {
            throw new Error( `HTTP error! status: ${response.status}` );
        }

        return response;
    } catch ( error ) {
        console.error( 'Error adding medication:', error );
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


// export async function updatePet(data: Pet) {
//     console.log("Update Pet data", data);
//     try {
//         const response = await fetch("/api/pets", {
//             method: "PUT",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(data),
//         });
//         if (response.ok) {
//             console.log("Pet updated successfully!");
//         } else {
//             console.error("Failed to add pet:", response.statusText);
//         }
//     } catch (error) {
//         console.error("Error adding pet:", error);
//     }
// }
