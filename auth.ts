import NextAuth, { type Session } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./app/_lib/prisma";
import { authConfig } from "./auth.config";

const adapter = PrismaAdapter(prisma);

export const { auth, handlers, signIn, signOut } = NextAuth({
    ...authConfig,
    adapter,
});

export async function validateSession(
    session: Session | null
): Promise<boolean> {
    if (!session) return false;
    return typeof session?.user?.id !== "string";
}
