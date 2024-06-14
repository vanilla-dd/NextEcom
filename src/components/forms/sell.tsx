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
import { useState } from "react";
import { Textarea } from "../ui/textarea";
import { sellFormSchema } from "@/lib/helpers";

export function SellForm() {
  const form = useForm<z.infer<typeof sellFormSchema>>({
    resolver: zodResolver(sellFormSchema),
    defaultValues: {
      productName: "",
      supportEmail: "",
      productImage: "",
      productPitch: "",
      websiteURL: "",
    },
    mode: "onChange",
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof sellFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  const [image, setImage] = useState("");

  return (
    <div className="flex gap-4">
      <div className="relative aspect-square w-36 self-start border">
        {image ? (
          <img src={image} alt="Product Logo" className="rounded-md" />
        ) : (
          <div className="absolute inset-0 bg-white">
            Todo: Upload Image Button
          </div>
        )}
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex-1 space-y-8"
        >
          <FormField
            control={form.control}
            name="websiteURL"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="relative before:absolute before:-right-2 before:text-red-500 before:content-['*']">
                  Website URL
                </FormLabel>
                <FormControl>
                  <Input
                    onInput={async (e) => {
                      if (e.currentTarget.value === "") return;
                      const response = await fetch("/api/extractMeta", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ url: e.currentTarget.value }),
                      });

                      if (!response.ok) {
                        throw new Error("Failed to fetch data");
                      }

                      const data = await response.json();
                      setImage(data.ogImage);
                      form.setValue("productImage", data.ogImage);
                      form.setValue("productName", data.ogTitle);
                      form.setValue("productPitch", data.ogDescription);
                    }}
                    placeholder="https://example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="productName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="relative before:absolute before:-right-2 before:text-red-500 before:content-['*']">
                  Product Name
                </FormLabel>
                <FormControl>
                  <Input placeholder="Sprout" {...field} />
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
                <FormLabel className="relative before:absolute before:-right-2 before:text-red-500 before:content-['*']">
                  Support Email
                </FormLabel>
                <FormControl>
                  <Input placeholder="sprout.support@gmail.com" {...field} />
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
                <FormLabel className="relative before:absolute before:-right-2 before:text-red-500 before:content-['*']">
                  Product Detail
                </FormLabel>
                <FormControl>
                  <Textarea placeholder="SaaS marketplace" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
