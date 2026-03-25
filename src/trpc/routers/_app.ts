import { z } from 'zod';
import { baseProcedure, createTRPCRouter, protectedProcedure } from '../init';
import prisma from '@/lib/db';
import { create } from 'node:domain';

import { inngest } from '@/inngest/client';

import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import { TRPCError } from '@trpc/server/unstable-core-do-not-import';
 
export const appRouter = createTRPCRouter({
  
  testAi: protectedProcedure.mutation(async() =>{
      
    //  throw new TRPCError({
    //     code : "BAD_REQUEST" ,
    //     message : "Something went wrong with AI provider"
    //  })

      await inngest.send({
        name : "execute/ai"
      }) ; 

      return {success : true , message : "AI Job Queued"} ;
  }) , 
  
  getWorkflows : protectedProcedure.query((ctx) => {
    
    return prisma.workflow.findMany();
    }),
    createWorkflow : protectedProcedure.mutation(async ()=>{
       
      await inngest.send({
        name : "test/hello.world", // name must same as the event name in function
        data :{
           email : "rohit123@example.com"
        },
      })

      return {success : true , message : "Job queued"} ;
    }) , 
});
 
// export type definition of API
export type AppRouter = typeof appRouter;