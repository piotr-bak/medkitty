import prisma from '@/app/_lib/prisma';
import { msElapsedFromMidnight } from '@/app/_lib/utils/msElapsedFromMidnight';
import { getSession } from '@auth0/nextjs-auth0';
import { NextResponse } from 'next/server';

export async function POST( request: Request ) {
    const session = await getSession();

    if ( !session?.user )
        return NextResponse.json( { error: 'Unauthorized' }, { status: 401 } );

    try {
        const { dayId, medicationId, amount, time } = await request.json();

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

        const offsetFromMidnight = await msElapsedFromMidnight( time );

        const parsedAmount = parseFloat( amount );

        const newDose = await prisma.dose.create( {
            data: {
                dayId,
                offset: offsetFromMidnight,
                medicationId,
                plannedAmount: parsedAmount,
                cumulativeAdjustment: 0,
            },
        } );

        return NextResponse.json( newDose, { status: 201 } );
    } catch ( error ) {
        console.error( 'Error adding dose:', error );
        return NextResponse.json(
            { error: 'Failed to add dose' },
            { status: 500 },
        );
    }
}
