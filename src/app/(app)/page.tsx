import NumberTicker from "@/components/landing/NumberTicker";
import MoneySvg from "@/components/svgs/MoneySvg";
import { Button } from "@/components/ui/button";
import { FlipWords } from "@/components/ui/flip-words";
import { Search } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const words = ["need.", "want.", "use."];

  return (
    <main className="flex flex-col items-center justify-center gap-6">
      <div className="text-center">
        <h1 className="max-w-[20ch] text-3xl font-semibold md:text-4xl lg:text-5xl xl:text-7xl">
          The only SaaS marketplace you&apos;ll ever
          <FlipWords words={words} className="text-purple-500" />
        </h1>
        <div className="relative mx-auto mt-3 w-fit rounded-lg border-2 px-3 py-1 font-medium">
          Potential saving upto <NumberTicker value={1000} />
          $/year
          <MoneySvg />
        </div>
      </div>
      <div>
        <Button asChild>
          <Link href={"/buy"} className="relative">
            Explore Marketplace
            <Search className="absolute -right-2 bottom-6 stroke-white mix-blend-difference" />
          </Link>
        </Button>
      </div>
    </main>
  );
}
