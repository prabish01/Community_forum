import { Button } from "@/components/ui/Button";
import { toast } from "@/components/ui/use-toast";
import Link from "next/link";

export const useCustomToast = () => {
  const loginToast = () => {
    const { dismiss } = toast({
      title: "Login required.",
      description: "You need to be logged in to do that.",
      variant: "destructive",
      action: (
        <Link href="/sign-in">
          <Button className="bg-white text-black rounded-xl" variant="default" onClick={() => dismiss()}>
            Login
          </Button>
        </Link>
      ),
    });
  };

  return { loginToast };
};
