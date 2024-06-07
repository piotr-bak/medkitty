import { prisma } from './app/_lib/prisma';

declare global {
    var prisma: PrismaClient | undefined;
}
