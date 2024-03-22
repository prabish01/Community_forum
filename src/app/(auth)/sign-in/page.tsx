import { Signin } from "@/components/Signin";
import { Button } from "@/components/ui/Button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import { FC } from "react";
//
// const SignIn = () => {
//   return (
//     <div>
//       <h1>This is signin dialog page</h1>
//     </div>
//   )
// }
// export default SignIn;

const page: FC = () => {
  return (
    <div className="main">
      <div className="child">
        <Link href={"/"}>
          <Button variant="ghost">
            <ChevronLeft />
            Home
          </Button>
        </Link>
        <Signin />
      </div>
    </div>
  );
};

export default page;
