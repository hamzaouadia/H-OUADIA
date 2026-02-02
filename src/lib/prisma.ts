// Support different @prisma/client export shapes across versions
import pkg from "@prisma/client";

type PrismaClientCtor = new (...args: unknown[]) => unknown;

const maybePkg = pkg as unknown;

const PrismaClientClass =
  (maybePkg as { PrismaClient?: PrismaClientCtor }).PrismaClient ??
  (maybePkg as { default?: PrismaClientCtor }).default ??
  (maybePkg as PrismaClientCtor);

type AnyPrisma = unknown;

const globalForPrisma = globalThis as unknown as {
  prisma?: AnyPrisma;
};

export const prisma =
  globalForPrisma.prisma ?? new (PrismaClientClass as PrismaClientCtor)();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
