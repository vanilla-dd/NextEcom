import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme/theme-provider";
import Navbar from "@/components/Navbar";

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
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
