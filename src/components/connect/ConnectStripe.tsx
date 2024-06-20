"use server";

import { accountLink } from "@/lib/helpers";
import { getIsConnected } from "@/server/actions/isSeller";
import Link from "next/link";
import React from "react";
import { Cloud, CloudOff } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function ConnectStripe() {
  const url = accountLink();
  const isConnected = await getIsConnected();
  return (
    <>
      <div className="flex w-fit flex-col rounded-md border-2 px-4 py-4">
        <div>
          <svg
            height="24"
            width="58"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 360 150"
          >
            <path
              fillRule="evenodd"
              d="M360 77.4c0 2.4-.2 7.6-.2 8.9h-48.9c1.1 11.8 9.7 15.2 19.4 15.2 9.9 0 17.7-2.1 24.5-5.5v20c-6.8 3.8-15.8 6.5-27.7 6.5-24.4 0-41.4-15.2-41.4-45.3 0-25.4 14.4-45.6 38.2-45.6 23.7 0 36.1 20.2 36.1 45.8zm-49.4-9.5h25.8c0-11.3-6.5-16-12.6-16-6.3 0-13.2 4.7-13.2 16zm-63.5-36.3c17.5 0 34 15.8 34.1 44.8 0 31.7-16.3 46.1-34.2 46.1-8.8 0-14.1-3.7-17.7-6.3l-.1 28.3-25 5.3V33.2h22l1.3 6.2c3.5-3.2 9.8-7.8 19.6-7.8zm-6 68.9c9.2 0 15.4-10 15.4-23.4 0-13.1-6.3-23.3-15.4-23.3-5.7 0-9.3 2-11.9 4.9l.1 37.1c2.4 2.6 5.9 4.7 11.8 4.7zm-71.3-74.8V5.3L194.9 0v20.3l-25.1 5.4zm0 7.6h25.1v87.5h-25.1V33.3zm-26.9 7.4c5.9-10.8 17.6-8.6 20.8-7.4v23c-3.1-1.1-13.1-2.5-19 5.2v59.3h-25V33.3h21.6l1.6 7.4zm-50-29.1l-.1 21.7h19v21.3h-19v35.5c0 14.8 15.8 10.2 19 8.9v20.3c-3.3 1.8-9.3 3.3-17.5 3.3-14.8 0-25.9-10.9-25.9-25.7l.1-80.1 24.4-5.2zM25.3 58.7c0 11.2 38.1 5.9 38.2 35.7 0 17.9-14.3 28.2-35.1 28.2-8.6 0-18-1.7-27.3-5.7V93.1c8.4 4.6 19 8 27.3 8 5.6 0 9.6-1.5 9.6-6.1 0-11.9-38-7.5-38-35.1 0-17.7 13.5-28.3 33.8-28.3 8.3 0 16.5 1.3 24.8 4.6v23.5c-7.6-4.1-17.2-6.4-24.8-6.4-5.3 0-8.5 1.5-8.5 5.4z"
            ></path>
          </svg>
          <p className="max-w-[40ch] text-sm">
            Stripe is the modern and secure way to integrate financial and
            payements services into your software platform or marketplace.
          </p>
        </div>
        <div className="place-self-end">
          {isConnected ? (
            <Button
              disabled
              className="flex cursor-not-allowed items-center justify-center gap-1"
            >
              <Cloud className="w-5" />
              Connected
            </Button>
          ) : (
            <Button asChild>
              <Link
                href={url}
                className="flex items-center justify-center gap-1"
              >
                <CloudOff className="w-5" />
                Connect to Stripe
              </Link>
            </Button>
          )}
        </div>
      </div>
    </>
  );
}