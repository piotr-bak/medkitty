import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./app/_lib/prisma";
import { authConfig } from "./auth.config";

const adapter = PrismaAdapter(prisma);

export const { auth, handlers, signIn, signOut } = NextAuth({
    ...authConfig,
    adapter,
});
