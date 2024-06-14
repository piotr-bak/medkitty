import prisma from '@/app/_lib/prisma';
import { authenticateUser } from '@/app/_lib/services/internalAuthService';
import { NextResponse } from 'next/server';

export async function GET( request: Request ) {
    const { response, user } = await authenticateUser();
    if ( response ) return response;

    const { searchParams } = new URL( request.url );
    const petId = searchParams.get( 'id' );

    try {
        if ( petId ) {
            const pet = await prisma.pet.findFirst( {
                where: {
                    id: petId,
                    OR: [
                        {
                            owners: {
                                some: {
                                    id: user.id,
                                },
                            },
                        },
                        {
                            caretakers: {
                                some: {
                                    id: user.id,
                                },
                            },
                        },
                    ],
                },
            } );

            if ( !pet )
                return NextResponse.json(
                    { error: 'Pet not found' },
                    { status: 404 },
                );

            return NextResponse.json( pet );
        } else if ( !petId || petId === null ) {
            const pets = await prisma.pet.findMany( {
                where: {
                    OR: [
                        {
                            owners: {
                                some: {
                                    id: user.id,
                                },
                            },
                        },
                        {
                            caretakers: {
                                some: {
                                    id: user.id,
                                },
                            },
                        },
                    ],
                },
            } );

            return NextResponse.json( pets );
        }
    } catch ( error ) {
        console.error( error );
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 },
        );
    }
}

export async function POST( request: Request ) {
    const { response, user } = await authenticateUser();
    if ( response ) return response;

    try {
        const { name, species, breed, sex } = await request.json();

        const newPet = await prisma.pet.create( {
            data: {
                name,
                species,
                breed,
                sex,
                owners: {
                    connect: { id: user.id },
                },
            },
        } );
        return NextResponse.json( newPet, { status: 201 } );
    } catch ( error ) {
        console.error( 'Error adding pet:', error );
        return NextResponse.json(
            { error: 'Failed to add pet' },
            { status: 500 },
        );
    }
}

export async function PUT( request: Request ) {
    const { response, user } = await authenticateUser();
    if ( response ) return response;

    try {
        const { id: petId, name, species, breed, sex } = await request.json();

        const pet = await prisma.pet.findFirst( {
            where: {
                id: petId,
                owners: {
                    some: {
                        id: user.id,
                    },
                },
            },
        } );

        if ( !pet ) {
            return NextResponse.json(
                { error: 'Pet not found' },
                { status: 404 },
            );
        }

        const updatedPet = await prisma.pet.update( {
            where: {
                id: petId,
            },
            data: {
                name,
                species,
                breed,
                sex,
            },
        } );

        return NextResponse.json( updatedPet, { status: 200 } );
    } catch ( error ) {
        console.error( 'Error adding pet:', error );
        return NextResponse.json(
            { error: 'Failed to add pet' },
            { status: 500 },
        );
    }
}
