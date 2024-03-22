import { Signin } from "@/components/Signin";
import Xbtn from "@/components/Xbtn";
import React from "react";

// interface pageProps {}

const page = () => {
  return (
    <div className="bg-zinc-900/20 z-10 inset-0 fixed rounded-lg">
      <div className="container flex items-center h-full max-w-lg mx-auto ">
        <div className="rounded-xl bg-white w-auto py-20 px-2 h-fit relative">
          <div className="rounded-xl absolute top-4 right-4 bg-white text-slate-500 font-semibold ">
            <Xbtn />
          </div>
          <Signin />
        </div>
      </div>
    </div>
  );
};

export default page;
