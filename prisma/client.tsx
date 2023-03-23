import { PrismaClient } from "@prisma/client";

declare global {
  namespace NodeJS {
    interface Global {}
  }
}

// add prisma to nodejs global type
interface CustomNodeJSGlobal extends NodeJS.Global {
  prisma: PrismaClient;
}

// prevent multiple instances of prisma
declare const global: CustomNodeJSGlobal;

const client = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") global.prisma = client;

export default client;
