import { z } from "zod";

export const PostValidator = z.object({
  title: z.string().min(3, {message: "Title must be greater than 3 characters"}).max(255, { message: "Title must be atleast 255 characters" }),
  communityId: z.string(),
  content: z.any(),
});

export type PostCreationRequest = z.infer<typeof PostValidator>;
