"use client";

import { RegisterUserSchema } from "@/lib/validations/user.schema";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { apiRegisterUser } from "@/lib/api";
import { useToast } from "./ui/use-toast";
import { ErrorResponse, UserRegisterResponse } from "@/lib/types";

const formSchema = RegisterUserSchema;

export function RegisterForm() {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await apiRegisterUser({ data: values });

    if (result.status === "success") {
      toast({
        title: "User registered!",
        description: `User with email ${
          (result as UserRegisterResponse).data.user.email
        } has been succesfully created.`,
      });
      router.push("/auth/login");
    } else {
      toast({
        title: "An error occured!",
        description: (result as ErrorResponse).message,
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="some@email.com" {...field} />
              </FormControl>
              <FormDescription>
                We will never share your email with anyone.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormDescription>
                Passwords must be at least 8 and less than 32 characters.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="passwordConfirm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormDescription>Passwords must match.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
