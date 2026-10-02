import { eq } from "drizzle-orm";
import { db } from "../connectDB";
import like from "../schema/like";
import repost from "../schema/repost";
import save from "../schema/save";

const basicUserInfo = {
    columns:{
        id:true,
        name:true,
        profilePicUrl:true  
    }
}as const;

const authorQuoteMedia={
    author:basicUserInfo,
    quotedPost:{
        with:{
            author:basicUserInfo
        }
    },media:{
        columns:{
            id:true,
            url:true,
            type:true
        }
    }
}as const;

export const getLikes = async(postId: string)=>
    await db.$count(like, eq(like.postId, postId))

export const getRepost = async(postId: string)=>
    await db.$count(repost, eq(repost.postId, postId))

export const getSaves = async(postId: string)=>
    await db.$count(save, eq(save.postId, postId))


export const getPost = async (postId: string)=>{
    return await db.query.post.findFirst({
        where:{
            id: postId
        },
        with:{
            ...authorQuoteMedia,
            replies:{
                with:authorQuoteMedia,
                where:{
                    parentPostId:postId
                }
            },quotes:{
                with:authorQuoteMedia,
                where:{
                    quotePostId:postId
                }
            },
        }
    })
}

export const getUsersWhoLiked = async (postId: string)=>{
    return await db.query.like.findMany({
        where:{postId},
        with:{
            user:basicUserInfo
        }
    })
}

export const getUsersWhoRepost = async (postId: string)=>{
    return await db.query.repost.findMany({
        where:{postId},
        with:{
            user:basicUserInfo
        }
    })
}
