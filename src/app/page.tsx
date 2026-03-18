import {cn} from "@/lib/utils"; 
// it is to combine class names conditionally, it is a common utility function used in React applications to manage CSS class names more efficiently. The cn function allows you to concatenate class names based on certain conditions, making it easier to apply styles dynamically.
import { Button } from "@/components/ui/button";

const Page = () => {
  const something = true; // This is just an example condition
  return (
    //<div className={cn("text-red-500 font-extrabold" , something && "text-green-500")}>text</div>
    <div className = "min-h-screen min-w-screen flex items-center justify-center">
      <Button variant = "outline" >
        clickme 
      </Button>
    </div>
  );
};

export default Page ; 
