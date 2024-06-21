"use client";

import React, { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProductSchema } from "@/lib/helpers";
import { useCurrentFromStep } from "@/hooks/useCurrentFromStep";
import { cn } from "@/lib/utils";
import FileUploader from "./file-uploader";
import { createProductAction } from "@/server/actions/stripe/createProduct";

export function CreateProduct() {
  const { setStep, getStep } = useCurrentFromStep();
  const [codeFileName, setCodeFileName] = useState("");

  const form = useForm<z.infer<typeof createProductSchema>>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      productFeaturedImage: "",
      productName: "",
      productPitch: "",
      productTag: "none",
      producutCategory: "none",
      supportEmail: "",
      websiteURL: "",
      planType: "one",
      productFeatures: [{ value: "" }],
      productType: "redeem",
      redeemCodeUrl: "",
      price: 1,
    },
    mode: "all",
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "productFeatures",
  });

  // Define a submit handler.
  async function onSubmit(values: z.infer<typeof createProductSchema>) {
    // Do something with the form values.
    await createProductAction(values);
  }

  const handleFileUpload = (uploadedUrl: string, fileName: string) => {
    form.setValue("redeemCodeUrl", uploadedUrl);
    setCodeFileName(fileName);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {getStep() === 0 ? (
          <>
            <FormField
              control={form.control}
              name="websiteURL"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="before:content-['We'll try to fill the details based on the URL'] relative text-base font-semibold before:absolute before:top-0">
                    Product URL
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

                        form.setValue("productFeaturedImage", data.ogImage);
                        form.setValue("productName", data.ogTitle);
                        form.setValue("productPitch", data.ogDescription);
                      }}
                      placeholder="https://sprout.com"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>This is your product URL.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="productName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">
                    Product Name
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Sprout" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display project name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="productPitch"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">
                    Grab users attention
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Tell us bit about you're project"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is your public display project description.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="supportEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">
                    Support Email
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="help.sprout@gmail.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your product support Email.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        ) : (
          <>
            {/* Step two */}
            {fields.map((item, index) => (
              <FormField
                key={item.id}
                control={form.control}
                name={`productFeatures.${index}.value`}
                render={({ field }) => (
                  <FormItem className={cn(index !== 0 && "!mt-0")}>
                    <FormLabel
                      className={cn(
                        index !== 0 && "sr-only",
                        "text-base font-semibold",
                      )}
                    >
                      Tell us about the product features.
                    </FormLabel>
                    <FormControl>
                      <div className="flex space-x-2">
                        <Input
                          {...field}
                          placeholder={`Feature ${index + 1}`}
                        />
                        <Button
                          type="button"
                          onClick={() => remove(index)}
                          disabled={index === 0}
                        >
                          Remove
                        </Button>
                      </div>
                    </FormControl>
                    <FormDescription>
                      Describe feature {index + 1}.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <div className="!mt-0 flex items-center justify-end">
              <Button type="button" onClick={() => append({ value: "" })}>
                Add Feature
              </Button>
            </div>
            <FormField
              control={form.control}
              name="redeemCodeUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">
                    Upload redeem codes (.csv file)
                  </FormLabel>
                  <FormControl>
                    <>
                      <Input
                        hidden
                        disabled
                        className="invisible hidden opacity-0"
                        placeholder="help.sprout@gmail.com"
                        {...field}
                      />
                      {form.getValues("redeemCodeUrl") ? (
                        <div>
                          <p>{codeFileName}</p>
                          <Button
                            onClick={() => {
                              form.setValue("redeemCodeUrl", "");
                            }}
                          >
                            Remove
                          </Button>
                        </div>
                      ) : (
                        <FileUploader onUpload={handleFileUpload} />
                      )}
                    </>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
        <div className="flex justify-between">
          <Button
            onClick={async () => {
              if (getStep() === 0) {
                const validFrom = await form.trigger([
                  "productFeaturedImage",
                  "productName",
                  "productPitch",
                  "supportEmail",
                  "websiteURL",
                ]);
                if (!validFrom) return;
                setStep(1);
                return;
              }
              setStep(0);
            }}
            type="button"
          >
            {getStep() === 0 ? "Next Step" : "Previous Step"}
          </Button>
          <Button
            type="submit"
            className={cn(
              getStep() === 1 ? "visible opacity-100" : "invisible opacity-0",
            )}
          >
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
