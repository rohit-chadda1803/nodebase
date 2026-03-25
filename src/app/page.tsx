"use client" 

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { createAuthClient } from "better-auth/react";

import { requireAuth } from "@/lib/auth-utils";
import { caller } from "@/trpc/server";
import { LogoutButton } from "./logout";

import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { toast } from "sonner";


const Page =  () => {
  //await requireAuth();
  //const { data } = authClient.useSession() ;

  // const data = await caller.getUsers() ; 
  const trpc = useTRPC() ; 
  const queryClient = useQueryClient();
  const {data} = useQuery(trpc.getWorkflows.queryOptions()) ;
  const create = useMutation(trpc.createWorkflow.mutationOptions({
    onSuccess : ()=>{
      toast.success("job queued") ;
    }
  })) ;

  return (
    //<div className={cn("text-red-500 font-extrabold" , something && "text-green-500")}>text</div>
    <div className = "min-h-screen min-w-screen flex items-center justify-center flex-col gap-y-6">
      Protected servr comp 
      <div>
        {JSON.stringify(data ,null ,2)}
      </div>

      <Button disabled={create.isPending} onClick={()=> create.mutate()}>
        Create Workflow
      </Button>
      <LogoutButton/>
    </div>
  );
};

export default Page ; 
