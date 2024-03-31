import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { communitySubscriptionValidator } from "@/lib/validators/community";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }
    const body = await req.json();
    const { communityId } = communitySubscriptionValidator.parse(body);

    const subscripitonExists = await db.subscription.findFirst({
      where: {
        communityId,
        userId: session.user.id,
      },
    });

    if (subscripitonExists) {
      return new Response("You are already subscribed to this community", { status: 400 });
    }

    await db.subscription.create({
      data: {
        communityId,
        userId: session.user.id,
      },
    });
    return new Response(communityId);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid request data passes", { status: 422 });
    }
    return new Response("Could not subscribed, please try again later", { status: 500 });
  }
}
