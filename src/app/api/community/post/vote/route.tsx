import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"
import { PostVoteValidator } from "@/lib/validators/vote"
import { getSession } from "next-auth/react"

export async function PATCH(req: Request) {
    try {
        const body = req.json()

        const { postId, voteType } = PostVoteValidator.parse(body)
        const session = await getAuthSession()
        
        if (!session?.user) {
            return new Response("Unauthorized", { status: 401 })
        }
        
        const existingVote = await db.vote.findFirst({
            where: {
                postId,
                userId: session.user.id
            },
            include: {
                author: true,
                vote: true
            }
        })

        const post = await db.post.findUnique({
            where: {
                id: postId
            }
        })
    }
    catch {
        
    }
}  
