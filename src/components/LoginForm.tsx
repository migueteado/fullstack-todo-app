"use client";

import { LoginUserSchema } from "@/lib/validations/user.schema";
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
import { apiLoginUser } from "@/lib/api";
import { useToast } from "./ui/use-toast";
import { ErrorResponse, UserLoginResponse } from "@/lib/types";
import Link from "next/link";
import useStore from "@/store";

const formSchema = LoginUserSchema;

export function LoginForm() {
  const store = useStore();
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await apiLoginUser({ data: values });
    console.log(result);
    if (result.status === "success") {
      store.setToken((result as UserLoginResponse).token);
      router.push("/todos");
    } else {
      toast({
        title: "An error occured!",
        description: (result as ErrorResponse).message,
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
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
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col items-center justify-end w-full gap-4 pt-2">
          <Button type="submit" className="w-full">
            Login
          </Button>
          <Link href="/auth/register" className="text-sm underline">
            Don&apos;t have an account? Register
          </Link>
        </div>
      </form>
    </Form>
  );
}
