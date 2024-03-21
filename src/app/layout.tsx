import  Navbar  from "@/components/Navbar";
import "@/styles/globals.css";
// Import Open Sans font using CSS @font-face rule or regular CSS import

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen pt-5 bg-slate-50">
      <Navbar />
      <div className="container max-w-7xl mx-auto h-full pt-12">{children}</div>
      {/* Include Toaster component */}
    </div>
  );
};

export default RootLayout;

// Metadata can be set in _app.js or individual pages
// export const metadata = {
//   title: "Breadit",
//   description: "A Reddit clone built with Next.js and TypeScript.",
// };
