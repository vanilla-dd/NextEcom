import type { Metadata } from "next";
// import { ThemeProvider } from "@/components/theme/theme-provider";
import Navbar from "@/components/nav/Navbar";

export const metadata: Metadata = {
  title: "Sprout",
  description: "Modern E-commerce Web app",
  icons: "/logo.svg",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <html lang="en" suppressHydrationWarning>
    //   <body>
    //     <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    <main className="flex flex-col gap-12">
      <header className="sticky top-0 z-[999] bg-white">
        <Navbar />
      </header>
      <div className="sm:px-2 md:px-3 lg:px-4">{children}</div>
    </main>
    // </ThemeProvider>
    // </body>
    // </html>
  );
}
