import React from "react";
import { Icons } from "./Icons";
import Link from "next/link";
import UserAuthForm from "./UserAuthForm";

export const Signin = () => {
  return (
    <div
      className="container w-full space-y-6 mx-auto flex flex-col
     justify-center sm:w-[500px]"
    >
      <div className="flex flex-col gap-2 items-center space-y-2 text-center align-middle justify-center">
        <div className="text-orange-400 mx-auto h-8 w-8 text-lg">
          <Icons.Nav_icon className="" />
        </div>
        <h1 className="text-slate-700 text-2xl font-semibold tracking-tighter">Welcome Back to Community Forum</h1>
        <p className="text-slate-700">
          By continuing, you are setting up a <br />
          COMMUNITY FORUM account and agree to our <br /> user agreement and privacy policy.{" "}
        </p>

        {/* signin form */}

        <UserAuthForm />

        <p className="pt-1 text-center text-sm text-slate-500">New to Community Forum?{""}</p>
        <Link
          href={"/sign-up"}
          className="
        text-sm text-slate-400 hover:text-slate-600 underline 
        underline-offset-4"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
};
