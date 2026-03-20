import {cn} from "@/lib/utils"; 
// it is to combine class names conditionally, it is a common utility function used in React applications to manage CSS class names more efficiently. The cn function allows you to concatenate class names based on certain conditions, making it easier to apply styles dynamically.
import { Button } from "@/components/ui/button";
import prisma from "@/lib/db";

const Page = async () => {
  //const something = true; // This is just an example condition

  const users = await prisma.user.findMany(); // Example of using Prisma to fetch data from the database
  return (
    //<div className={cn("text-red-500 font-extrabold" , something && "text-green-500")}>text</div>
    <div className = "min-h-screen min-w-screen flex items-center justify-center">
      <Button variant = "outline" >
        {JSON.stringify(users)}
      </Button>
    </div>
  );
};

export default Page ; 
