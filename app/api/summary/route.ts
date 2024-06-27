import dayjs from 'dayjs';
import { NextResponse } from 'next/server';

import prisma from '@/app/_lib/prisma';
import { authenticateUser } from '@/app/_lib/services/internalAuthService';

export async function GET( request: Request ) {
    const { response, user } = await authenticateUser();
    if ( response ) return response;

    // const { searchParams } = new URL( request.url );
    // const petId = searchParams.get( 'id' );

    try {
        const { searchParams } = new URL( request.url );
        const dateParam = searchParams.get( 'date' );
        const today = dateParam ? dayjs( dateParam ).startOf( 'day' ).toDate() : dayjs().startOf( 'day' ).toDate();

        const doses = await prisma.dose.findMany( {
            where: {
                status: 'PENDING',
                day: {
                    date: today,
                },
                OR: [
                    {
                        day: {
                            medicationPlan: {
                                pet: {
                                    owners: {
                                        some: {
                                            id: user.id,
                                        },
                                    },
                                },
                            },
                        },
                    },
                    {
                        day: {
                            medicationPlan: {
                                pet: {
                                    caretakers: {
                                        some: {
                                            id: user.id,
                                        },
                                    },
                                },
                            },
                        },
                    },
                ],
            },
            include: {
                day: {
                    select: {
                        date: true,
                        medicationPlan: {
                            select: {
                                pet: {
                                    select: {
                                        name: true,
                                        species: true,
                                    },
                                },
                            },
                        },
                    },
                },
                medication: {
                    select: {
                        name: true,
                        doseUnit: true,
                    },
                },
            },
        } );

        return NextResponse.json( doses, { status: 200 } );
    } catch ( error ) {
        console.error( 'Error fetching summary:', error );
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
