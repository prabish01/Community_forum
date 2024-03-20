import { authOptn } from "@/lib/auth";
import NextAuth from "next-auth/next";

const handler = NextAuth(authOptn);
export { handler as GET, handler as POST };
