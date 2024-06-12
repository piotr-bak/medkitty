import type { Pet } from '../../_types';

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
    console.log( 'Update Pet data', data );
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
