import { inngest } from "./client";
import prisma from "@/lib/db";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import {generateText} from "ai"

import { createOpenAI } from '@ai-sdk/openai';
import { createAnthropic } from "@ai-sdk/anthropic" ;

const google =  createGoogleGenerativeAI() ; 
const openai = createOpenAI() ;
const antrophic = createAnthropic() ; 

export const execute = inngest.createFunction(
  { id: "execute-ai"   },
  { event: "execute/ai" },
  async ({ event, step }) => {
    
    await step.sleep("pretend" , "5s") ; 

    const {steps : geminiSteps} = await step.ai.wrap("gemini-generate-text" , 
      generateText , 
      {
        model : google("gemini-2.5-flash") ,
        system : "You are a helpful assistant." ,
        prompt : "who is mahadev ?"
      }
    ) ; 

    const {steps : openaiSteps} = await step.ai.wrap("openai-generate-text" , 
      generateText , 
      {
        model : openai("gpt-4o") ,
        system : "You are a helpful assistant." ,
        prompt : "who is mahadev ?"
      }
    ) ; 
   
    const {steps : anthropicSteps} = await step.ai.wrap("anthropic-generate-text" , 
      generateText , 
      {
        model : antrophic("claude-3-5-sonnet") ,
        system : "You are a helpful assistant." ,
        prompt : "who is mahadev ?"
      }
    ) ; 


    return {
      geminiSteps , 
      openaiSteps ,
      anthropicSteps
    }
  } , 
);
