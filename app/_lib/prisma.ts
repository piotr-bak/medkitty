import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

declare global {
    // Prevent multiple instances of Prisma Client in development
    // See: https://www.prisma.io/docs/support/help-articles/nextjs-prisma-client-dev-practices#problem
    var prisma: any;
}

if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient();
} else {
    if (!global.prisma) {
        global.prisma = new PrismaClient();
    }
    prisma = global.prisma;
}

export default prisma;
