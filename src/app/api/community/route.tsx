// import { getAuthSession } from "@/lib/auth";
// import { db } from "@/lib/db";
// import { communityValidator } from "@/lib/validators/community";
// import { z } from "zod";

// export async function POST(req: Request) {
//   try {
//     const session = await getAuthSession();

//     if (!session?.user) {
//       return new Response("Unauthorized", { status: 401 });
//     }
//     const body = await req.json();
//     const { name } = communityValidator.parse(body);

//     const communityExists = await db.community.findFirst({
//       where: { name },
//     });

//     if (communityExists) {
//       return new Response("Community ALready Exists", { status: 409 });
//     }
//     const community = await db.community.create({
//       data: {
//         name,
//         creatorId: session.user.id,
//       },
//     });

//     await db.subscription.create({
//       data: {
//         userId: session.user.id,
//         communityId: community.id,
//       },
//     });

//     return new Response(community.name);
//   } catch (error) {
//     if (error instanceof z.ZodError) {
//       return new Response(error.message, { status: 400 });
//     }
//     return new Response("Unable to create community", { status: 500 });
//   }
// }


import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { communitySubscriptionValidator } from "@/lib/validators/community";
// import { SubredditSubscriptionValidator } from "@?/lib/validators/subreddit";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { communityId } = communitySubscriptionValidator.parse(body);

    // check if user has already subscribed or not
    const subscriptionExists = await db.subscription.findFirst({
      where: {
        communityId,
        userId: session.user.id,
      },
    });

    if (!subscriptionExists) {
      return new Response("You've not been subscribed to this subreddit, yet.", {
        status: 400,
      });
    }

    // create subreddit and associate it with the user
    await db.subscription.delete({
      where: {
        userId_communityId: {
          communityId,
          userId: session.user.id,
        },
      },
    });

    return new Response(communityId);
  } catch (error) {
    error;
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }

    return new Response("Could not unsubscribe from subreddit at this time. Please try later", { status: 500 });
  }
}