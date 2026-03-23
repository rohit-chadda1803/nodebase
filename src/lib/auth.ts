import { betterAuth } from "better-auth";

import { prismaAdapter } from "better-auth/adapters/prisma";

import prisma from "@/lib/db";

import { PrismaClient } from "@/generated/prisma/client";

export const auth = betterAuth({
   database: prismaAdapter(prisma , {
      provider: "postgresql",
   }),

   emailAndPassword :{
     enabled: true,
     autoSignIn: true, // set to true to automatically sign in the user after registration
   } , 
});