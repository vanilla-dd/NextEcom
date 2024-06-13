"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const formSchema = z.object({
  productName: z.string().min(1, {
    message: "Username must be at least 1 characters.",
  }),
  supportEmail: z
    .string({ required_error: "Support Email can't be empty" })
    .email({ message: "Enter a valid email" }),
  productPitch: z
    .string({ required_error: "Tell users bit about your product" })
    .max(100, { message: "Shorter description makes better impression" }),
  websiteURL: z.string({ required_error: "Webite URL is required" }).min(2),
});

export function SellForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: "",
      supportEmail: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="productName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="supportEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Support Email</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="productPitch"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Support Email</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="websiteURL"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Support Email</FormLabel>
              <FormControl>
                <Input
                  onInput={async (e) => {
                    if (e.currentTarget.value === "") return;
                    const response = await fetch("/api/extractMeta", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({ url: "https://appsumo.com" }),
                    });
                    if (!response.ok) {
                      throw new Error("Failed to fetch data");
                    }

                    const data = await response.json();
                    console.log(data.ogImage);
                  }}
                  placeholder="shadcn"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
