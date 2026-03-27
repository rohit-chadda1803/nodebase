"use client"

import { useTRPC } from "@/trpc/client"
import { Button } from "@/components/ui/button";

import { toast } from "sonner";

import { useMutation } from "@tanstack/react-query"

const Page = () => {
    const trpc = useTRPC();
    const testAI = useMutation(trpc.testAi.mutationOptions({
        onSuccess: () => {
            toast.success("success");
        },
        onError: ({ message }) => {
            toast.error(message);
        }

    }));

    return (
        <Button onClick={() =>
            testAI.mutate()
        }>
            click to test subscription .
        </Button>
    )
}

export default Page;

// go to --- http://localhost:3000/subscription