import { db } from "../connectDB";
import { postCounts } from "./user_activity";

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

export const getPost = async (postId: string)=>{
    return await db.query.post.findFirst({
        where:{
            id: postId
        },extras:postCounts,
        with:{
            ...authorQuoteMedia,
            replies:{
                with:authorQuoteMedia,
                where:{
                    parentPostId:postId
                },extras:postCounts
            },quotes:{
                with:authorQuoteMedia,
                where:{
                    quotePostId:postId
                },extras:postCounts
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
