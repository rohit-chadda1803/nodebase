import { betterAuth } from "better-auth";

import {checkout , polar , portal} from "@polar-sh/better-auth" ; 

import { prismaAdapter } from "better-auth/adapters/prisma";

import prisma from "@/lib/db";

import { PrismaClient } from "@/generated/prisma/client";

import { polarClient } from "./polar";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", 
    }),
    emailAndPassword:{
        enabled:true,
        autoSignIn : true
    },
    plugins:[
        polar({
            client: polarClient,
            createCustomerOnSignUp:true,
            use: [
                checkout({
                    products:[
                        {
                            productId:"9059753e-ddca-4387-a6eb-6c3e456207b5",
                            slug:"pro",
                        }
                    ],
                    successUrl: process.env.POLAR_SUCCESS_URL,
                    authenticatedUsersOnly:true,
                }),
                portal(),
            ],
        })
    ],
});