import dayjs from 'dayjs';
import { NextResponse } from 'next/server';

import prisma from '@/app/_lib/prisma';
import { authenticateUser } from '@/app/_lib/services/internalAuthService';

export async function GET( request: Request ) {
    const { response, user } = await authenticateUser();
    if ( response ) return response;

    const { searchParams } = new URL( request.url );
    const petId = searchParams.get( 'id' );

    try {
        if ( petId ) {
            const medicationPlan = await prisma.medicationPlan.findFirst( {
                where: {
                    petId: petId,
                    userId: user.id,
                },
                include: {
                    days: {
                        include: {
                            doses: {
                                include: {
                                    medication: true,
                                },
                            },
                        },
                    },
                },
            } );

            if ( !medicationPlan )
                return NextResponse.json(
                    { error: 'Pet not found or no plan created yet' },
                    { status: 404 },
                );

            return NextResponse.json( medicationPlan );
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
        const { name, startDate, endDate } = await request.json();
        const planDuration = dayjs( endDate ).diff( dayjs( startDate ), 'day' );
        const planDays = [];

        for ( let i = 0; i <= planDuration; i++ ) {
            const dayDate = dayjs( startDate ).add( i, 'day' ).toDate();
            planDays.push( {
                date: dayDate,
            } );
        }

        const { searchParams } = new URL( request.url );
        const petId = searchParams.get( 'id' );

        if ( petId ) {
            const newPlan = await prisma.medicationPlan.create( {
                data: {
                    name,
                    startDate: new Date( startDate ),
                    endDate: new Date( endDate ),
                    petId: petId,
                    userId: user.id,
                    days: {
                        create: planDays.map( ( day ) => ( {
                            date: day.date,
                        } ) ),
                    },
                },
            } );
            return NextResponse.json( newPlan, { status: 201 } );
        }
    } catch ( error ) {
        console.error( 'Error adding pet:', error );
        return NextResponse.json(
            { error: 'Failed to add pet' },
            { status: 500 },
        );
    }
}
