import { INFINITE_SCROLL_PAGINATION_RESULT } from '@/config';
import { db } from '@/lib/db';
import React from 'react'
import PostFeed from "@/components/PostFeed";
const GeneralFeed = async () => {


    const posts = await db.post.findMany({
        orderBy: {
            createdAt: 'desc'
        },
        include: {
            community: true,
            author: true,
            votes: true,
            comments: true,

        },
        take: INFINITE_SCROLL_PAGINATION_RESULT
    })



  return <PostFeed initialPosts={posts}/>
};

export default GeneralFeed