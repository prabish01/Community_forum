import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { communitySubscriptionValidator } from "@/lib/validators/community";
import { PostValidator } from "@/lib/validators/post";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }
    const body = await req.json();
    const { communityId, title, content } = PostValidator.parse(body);

    const subscripitonExists = await db.subscription.findFirst({
      where: {
        communityId,
        userId: session.user.id,
      },
    });

    if (!subscripitonExists) {
      return new Response("Subscribe to post in this community", { status: 400 });
    }

    await db.post.create({
      data: {
        communityId,
        title,
        content,
        authorId: session.user.id,
      },
    });
    return new Response("OK");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid POST request data passes", { status: 422 });
    }
    return new Response("Could not post to this community, please try again later", { status: 500 });
  }
}
