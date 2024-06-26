import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import { Open_Sans } from "next/font/google";
// import { <Providers></Providers> } from "@radix-ui/react-toast";
import Providers from "@/components/Providers";
import { Toaster } from "@/components/ui/toaster";

// Import Open Sans font using CSS @font-face rule or regular CSS import

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children, authModal }: { children: React.ReactNode; authModal: React.ReactNode }) {
  return (
    <html lang="en" className={cn(openSans.className, "bg-red-400 text-black")}>
      <body className="min-h-screen  pt-5 bg-slate-50">
        <Providers>

        {/* @ts-expect-error server component */}
        <Navbar />
        {authModal}
        <div className="container max-w-7xl mx-auto h-full pt-12">{children}</div>
        <Toaster/>
        </Providers>
      </body>
    </html>
  );
}

// Metadata can be set in _app.js or individual pages
// export const metadata = {
//   title: "Breadit",
//   description: "A Reddit clone built with Next.js and TypeScript.",
// };
