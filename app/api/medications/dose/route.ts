import prisma from '@/app/_lib/prisma';
import { authenticateUser } from '@/app/_lib/services/internalAuthService';
import { secondsElapsedFromMidnight } from '@/app/_lib/utils/secondsElapsedFromMidnight';
import { NextResponse } from 'next/server';

export async function POST( request: Request ) {
    const { response, user } = await authenticateUser();
    if ( response ) return response;

    try {
        const { dayId, medicationId, amount, time } = await request.json();
        const offsetFromMidnight = await secondsElapsedFromMidnight( time );
        const parsedPlannedAmount = parseFloat( amount );

        const newDose = await prisma.dose.create( {
            data: {
                day: {
                    connect: { id: dayId },
                },
                offset: offsetFromMidnight,
                medication: {
                    connect: { id: medicationId },
                },
                plannedAmount: parsedPlannedAmount,
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
