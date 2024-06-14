import { PrismaClient } from '@prisma/client'

const prismaClient = new PrismaClient();

export function getPrisma(): PrismaClient {
    return prismaClient;
}