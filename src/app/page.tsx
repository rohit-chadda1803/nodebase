import {cn} from "@/lib/utils"; 
// it is to combine class names conditionally, it is a common utility function used in React applications to manage CSS class names more efficiently. The cn function allows you to concatenate class names based on certain conditions, making it easier to apply styles dynamically.
import { Button } from "@/components/ui/button";
import prisma from "@/lib/db";

import { caller } from "@/trpc/server";
import { getQueryClient , trpc } from "@/trpc/server";

import { Client } from "./client";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"; // This is a component provided by the @tanstack/react-query library that helps manage the hydration of server-rendered data on the client side. It ensures that the data fetched on the server is properly hydrated and available for use in client components, preventing issues with mismatched data between server and client renders.
import { prefetchDNS } from "react-dom";
import { Suspense } from "react";


const Page = async () => {
  //const something = true; // This is just an example condition
  
  // const users = await caller.user.findMany(); // Example of using Prisma to fetch data from the database
  //const users = await caller.getUsers(); // Example of using tRPC to fetch data from the server, where getUsers is a procedure defined in your tRPC router that retrieves user data from the database.

  const queryClient = getQueryClient(); // This is a function that retrieves the QueryClient instance, which is responsible for managing the state of your queries and mutations in a React application using the @tanstack/react-query library. The QueryClient allows you to perform operations like fetching, caching, and updating data in a way that is efficient and easy to manage across your application.
  void queryClient.prefetchQuery(trpc.getUsers.queryOptions()); // This line is using the prefetchQuery method of the QueryClient to prefetch data for a specific query, in this case, the getUsers query defined in your tRPC router. Prefetching allows you to fetch data in advance, so that when the component that needs this data is rendered, it can access it immediately from the cache without having to wait for a network request. This can improve the performance and user experience of your application by reducing loading times.
  return (
    //<div className={cn("text-red-500 font-extrabold" , something && "text-green-500")}>text</div>
    <div className = "min-h-screen min-w-screen flex items-center justify-center">
      {/* {JSON.stringify(users)} */}

      <HydrationBoundary state = {dehydrate(queryClient)}>
        <Suspense fallback={<div>Loading...</div>}>
          <Client />
        </Suspense>
      </HydrationBoundary>  
      
    </div>
  );
};

export default Page ; 
