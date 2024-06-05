import { handleAuth, handleCallback } from "@auth0/nextjs-auth0";
import prisma from "@/app/_lib/prisma";
import type { Session } from "@auth0/nextjs-auth0";
import type { NextApiRequest } from "next";

async function afterCallback(
    req: NextApiRequest,
    session: any,
    state: Session
) {
    const auth0UserId = session.user.sub;
    const userName = session.user.name;
    const userEmail = session.user.email ? session.user.email : "";

    let userAlreadyExists = await prisma.user.findUnique({
        where: {
            foreignId: auth0UserId,
        },
    });

    if (!userAlreadyExists) {
        await prisma.user.create({
            data: {
                foreignId: auth0UserId,
                name: userName,
                email: userEmail,
            },
        });
    }

    return session;
}

export const GET = handleAuth({
    callback: handleCallback({ afterCallback }),
});
