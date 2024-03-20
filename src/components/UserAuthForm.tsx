"use client";

import { FC, useState } from "react";
import { Button } from "./ui/Button";
import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";
import { Icons } from "./Icons";
import { useToast } from "./ui/use-toast";
// import { error } from "console";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const UserAuthForm: FC<UserAuthFormProps> = ({ className, ...props }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const googleLogin = async () => {
    setIsLoading(true);
    try {
      //
      // throw new Error()
      await signIn("google")
    } catch (error) {
      //toast notification
      toast({
        title: "There was a problem",
        description: "There was a problem logging in with google",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex  flex-col gap-3 justify-center w-full ", className)} {...props}>
      <Button className="w-full bg-white " variant="outline" onClick={googleLogin} isLoading={isLoading} size="sm">
        {isLoading ? null : <Icons.google className="h-4 w-4 mr-5 " />}
        Continue with Google
      </Button>

      <Button className="w-full " onClick={googleLogin} isLoading={isLoading} size="sm">
        {isLoading ? null : <Icons.apple className="h-4 w-4 mr-5 " />}
        Continue with Apple
      </Button>
    </div>
  );
};

export default UserAuthForm;
