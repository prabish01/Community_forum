import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { communityValidator } from "@/lib/validators/community";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }
    const body = await req.json();
    const { name } = communityValidator.parse(body);

    const communityExists = await db.community.findFirst({
      where: { name },
    });

    if (communityExists) {
      return new Response("Community ALready Exists", { status: 409 });
    }
    const community = await db.community.create({
      data: {
        name,
        creatorId: session.user.id,
      },
    });

    await db.subscription.create({
      data: {
        userId: session.user.id,
        communityId: community.id,
      },
    });

    return new Response(community.name);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }
    return new Response("Unable to create community", { status: 500 });
  }
}