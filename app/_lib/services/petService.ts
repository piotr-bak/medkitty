import type { Pet } from '../../_types';

import { revalidateFetch } from '../hooks/useFetch';

export async function addPet( data: Pet ) {
    try {
        const response = await fetch( '/api/pets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify( data ),
        } );
        if ( response.ok ) {
            console.log( 'Pet added successfully!' );
            const newPet = await response.json();
            return newPet.id;
        } else {
            console.error( 'Failed to add pet:', response.statusText );
        }
    } catch ( error ) {
        console.error( 'Error adding pet:', error );
    }
}

export async function updatePet( data: Pet ) {
    try {
        const response = await fetch( '/api/pets', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify( data ),
        } );
        if ( response.ok ) {
            console.log( 'Pet updated successfully!' );
        } else {
            console.error( 'Failed to add pet:', response.statusText );
        }
    } catch ( error ) {
        console.error( 'Error adding pet:', error );
    }
}

export async function deletePet( petId: string ): Promise<boolean> {
    try {
        const response = await fetch( `/api/pets?id=${petId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        } );
        if ( response.ok ) {
            console.log( 'Pet deleted successfully!' );
            return true;
        } else {
            console.error( 'Failed to delete pet:', response.statusText );
            return false;
        }
    } catch ( error ) {
        console.error( 'Error deleting pet:', error );
        return false;
    }
}

