import { Navbar } from "@/components/Navbar";
// import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { Open_Sans } from "next/font/google";

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Breadit",
  description: "A Reddit clone built with Next.js and TypeScript.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn(openSans.className, "bg-red-400 text-white")}>
      <body className="min-h-screen  pt-5 bg-slate-50">
        <Navbar />
        <div className="contianer max-w-7xl mx-auto h-full pt-12">{children}</div>
        {/* <Toaster/> */}
      </body>
    </html>
  );
}
