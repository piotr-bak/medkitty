import { NextResponse } from 'next/server';

import prisma from '@/app/_lib/prisma';
import { authenticateUser } from '@/app/_lib/services/internalAuthService';

export async function GET() {
    const { response, user } = await authenticateUser();
    if ( response ) return response;

    try {
        const availableMedications = await prisma.medication.findMany( {
            where: {
                userId: user.id,
            },
        } );

        if ( !availableMedications )
            return NextResponse.json(
                { error: "No medication found" },
                { status: 404 }
            );

        return NextResponse.json( availableMedications );
    } catch ( error ) {
        console.error( error );
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function POST( request: Request ) {
    const { response, user } = await authenticateUser();
    if ( response ) return response;

    try {
        const { name, totalDoses, doseUnit, visualDescription } = await request.json();
        const totalDosesNumber = parseInt( totalDoses );

        if ( isNaN( totalDosesNumber ) ) {
            return NextResponse.json(
                { error: 'Invalid total doses value' },
                { status: 400 },
            );
        }

        const newMedication = await prisma.medication.create( {
            data: {
                name,
                totalDoses: totalDosesNumber,
                doseUnit,
                visualDescription,
                userId: user.id,
            },
        } );

        return NextResponse.json( newMedication, { status: 201 } );
    } catch ( error ) {
        console.error( 'Error adding medication:', error );
        return NextResponse.json(
            { error: 'Failed to add medication' },
            { status: 500 },
        );
    }
}
