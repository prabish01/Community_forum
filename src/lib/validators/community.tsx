import { z } from "zod";

export const communityValidator = z.object({
  name: z.string().min(3).max(21),
});

export const communitySubscriptionValidator = z.object({
  communityId: z.string(),
});

export type CreateCommunityPayload = z.infer<typeof communityValidator>;
export type SubscribeToCommunityPayload = z.infer<typeof communitySubscriptionValidator>;
