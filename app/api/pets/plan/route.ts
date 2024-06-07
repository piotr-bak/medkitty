import prisma from '@/app/_lib/prisma';
import { getSession } from '@auth0/nextjs-auth0';
import { NextResponse } from 'next/server';
import dayjs from 'dayjs';

export async function GET( request: Request ) {
    const session = await getSession();

    if ( !session?.user )
        return NextResponse.json( { error: 'Unauthorized' }, { status: 401 } );

    const user = await prisma.user.findUnique( {
        where: {
            foreignId: session.user.sub,
        },
    } );

    if ( !user ) {
        return NextResponse.json( { error: 'User not found' }, { status: 404 } );
    }

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
    const session = await getSession();

    if ( !session?.user )
        return NextResponse.json( { error: 'Unauthorized' }, { status: 401 } );

    try {
        const { name, startDate, endDate } = await request.json();

        const user = await prisma.user.findUnique( {
            where: {
                foreignId: session.user.sub,
            },
        } );

        if ( !user ) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 },
            );
        }

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
