import { NextResponse } from 'next/server';
import { getSession } from '@auth0/nextjs-auth0';
import prisma from '@/app/_lib/prisma';

export async function authenticateUser() {
    const session = await getSession();
    if ( !session?.user ) {
        return {
            response: NextResponse.json( { error: 'Unauthorized' }, { status: 401 } ),
            user: undefined,
        };
    }
    const user = await prisma.user.findUnique( {
        where: {
            foreignId: session.user.sub,
        },
    } );

    if ( !user ) {
        return {
            response: NextResponse.json( { error: 'User not found' }, { status: 404 } ),
            user: undefined,
        }
    }

    return {
        response: undefined,
        user: user,
    }
}
