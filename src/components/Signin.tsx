import React from "react";
import { Icons } from "./Icons";

export const Signin = () => {
  return (
    <div
      className="container w-full space-y-6 mx-auto flex flex-col
     justify-center sm:w-[500px]"
    >
      <div className="flex flex-col items-center space-y-2 text-center align-middle justify-center">
        <div className="text-orange-400 mx-auto h-8 w-8 text-lg">
          <Icons.Nav_icon className="" />
        </div>
        <h1 className="text-slate-700 text-2xl font-semibold tracking-tighter">Welcome Back to Community Forum</h1>
        <p className="text-slate-700">
          By continuing, you are setting up a <br />
          COMMUNITY FORUM account and agree to our <br /> user agreement and privacy policy.{" "}
        </p>

        {/* signin form */}
      </div>
    </div>
  );
};
