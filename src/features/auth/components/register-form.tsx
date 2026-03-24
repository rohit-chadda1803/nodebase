"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import router from "next/dist/shared/lib/router/router";

import { authClient } from "@/lib/auth-client";

const loginSchema = z.object({
    email: z.email("please enter a valid email address"),
    password: z.string().min(1, "password is required"),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
    // show in confirm password field error if password and confirm password do not match
});

type RegisterFormValues = z.infer<typeof loginSchema>;

export function RegisterForm() {
    const router = useRouter();

    const form = useForm<RegisterFormValues>({ // <login--> to make type safe
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
    }) ; 

    const onSubmit = async (values: RegisterFormValues) => {
        //console.log(values);
        // here we will call the BetterAuth to register the user
        await authClient.signUp.email(
        {
            name: values.email,
            email: values.email,
            password: values.password,
            callbackURL: "/" , 
        } , 
        {
            onSuccess: () => {
                router.push("/")
            },
            onError:(ctx)=>{
                toast.error(ctx.error.message)
            }
        }
    )
    }

    const isPending = form.formState.isSubmitting;

    return (
        <div className="flex flex-col gap-6">
             <Card>
                <CardHeader className="text-center">
                    <CardTitle>
                        Get Started
                    </CardTitle>

                    <CardDescription>
                       Create your account to get started
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}> 
                        {/* ...form = object ke saare props ek saath pass karna”  */}
                        <form  onSubmit ={form.handleSubmit(onSubmit)} 
                        >
                            <div className="grid gap-6">
                                <div className="flex flex-col gap-4">
                                    <Button variant = "outline" className = "w-full" type ="button" disabled={isPending}> 

                                        <Image alt="GitHub" src="/logos/github.svg" width={20} height={20}/>    
                                        Continue with Github
                                    </Button>

                                    <Button variant = "outline" className = "w-full" type ="button" disabled={isPending}> 

                                        <Image alt="Google" src="/logos/google.svg" width={20} height={20}/>    
                                        Continue with Google
                                    </Button>
                                </div>

                                <div className="grid gap-6">
                                    <FormField 
                                        control={form.control} 
                                        // form.control is an object that provides methods and properties to manage the state and behavior of the form, such as handling form submission, validation, and tracking field values. By passing form.control to the FormField component, you are allowing it to access and interact with the form's state and functionality, enabling features like validation and error handling for that specific field.
                                        name="email"
                                        render={({field}) => (
                                           <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="jamesbond@m6mail.com" {...field} />
                                                {/* ..field is an object that contains the value and event handlers for the input field */}

                                            </FormControl>
                                            <FormMessage />
                                           </FormItem>
                                        )}                                        
                                    />

                                    <FormField 
                                        control={form.control} 
                                        // form.control is an object that provides methods and properties to manage the state and behavior of the form, such as handling form submission, validation, and tracking field values. By passing form.control to the FormField component, you are allowing it to access and interact with the form's state and functionality, enabling features like validation and error handling for that specific field.
                                        name="password"
                                        render={({field}) => (
                                           <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input placeholder="*******" {...field} />
                                                {/* ..field is an object that contains the value and event handlers for the input field */}

                                            </FormControl>
                                            <FormMessage />
                                           </FormItem>
                                        )}                                        
                                    />

                                    <FormField 
                                        control={form.control} 
                                        // form.control is an object that provides methods and properties to manage the state and behavior of the form, such as handling form submission, validation, and tracking field values. By passing form.control to the FormField component, you are allowing it to access and interact with the form's state and functionality, enabling features like validation and error handling for that specific field.
                                        name="confirmPassword"
                                        render={({field}) => (
                                           <FormItem>
                                            <FormLabel>Confirm Password</FormLabel>
                                            <FormControl>
                                                <Input placeholder="*******" {...field} />
                                                {/* ..field is an object that contains the value and event handlers for the input field */}

                                            </FormControl>
                                            <FormMessage />
                                           </FormItem>
                                        )}                                        
                                    />

                                    <Button type="submit" className = "w-full" disabled={isPending}>
                                        Sign Up
                                    </Button>
                                </div>

                                {/* register page ka link */}
                                <div className="text-center text-sm">
                                    Already  have an account? {" "}
                                    <Link href="/login" className="underline underline-offset-4">
                                        Login
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </Form>
                </CardContent>
             </Card>
        </div>

        
    )


}

