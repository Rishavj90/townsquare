import { and, eq } from "drizzle-orm";
import { db } from "../connectDB";
import like from "../schema/like";
import media from "../schema/media";
import post from "../schema/post";
import repost from "../schema/repost";
import save from "../schema/save";
import follow from "../schema/follow";

type userAndPost = {
    userId:string, 
    postId:string
}

type postData = {
    authorId: string,
    parentPostId: string | null,
    quotePostId: string | null,
    content: string,
}

type mediaData = {
    url: string,
    user_id: string,
    name: string,
    post_id: string,
}

export const newPost = async (postData:postData, mediaData:mediaData)=>{
    const p = await db.insert(post).values(postData).returning()
    const m = await db.insert(media).values(mediaData).returning()
    return {
        post:p,
        media:m
    };
}

export const deletePost = async (postId:string)=>{
    return await db.delete(post).where(eq(post.id, postId)).returning()
}

export const newLike = async (data:userAndPost)=>{
    return await db.insert(like).values(data).returning()
}

export const newRepost = async (data:userAndPost)=>{
    return await db.insert(repost).values(data).returning()
}

export const newSave = async (data:userAndPost)=>{
    return await db.insert(save).values(data).returning()
}

export const deleteLike = async (data:userAndPost)=>{
    return await db.delete(like).where(and(
        eq(like.userId, data.userId),
        eq(like.postId, data.postId)
    )).returning()
}

export const deleteRepost = async (data:userAndPost)=>{
    return await db.delete(repost).where(and(
        eq(repost.userId, data.userId),
        eq(repost.postId, data.postId)
    )).returning()
}

export const deleteSave = async (data:userAndPost)=>{
    return await db.delete(save).where(and(
        eq(save.userId, data.userId),
        eq(save.postId, data.postId)
    )).returning()
}

type userAndfollowingUser = {
    userId:string, 
    followingId:string
}

export const followUser = async (data:userAndfollowingUser)=>{
    return await db.insert(follow).values(data).returning()
}

export const unfollowUser = async (data:userAndfollowingUser)=>{
    return await db.delete(follow).where(and(
        eq(follow.userId, data.userId),
        eq(follow.followingId, data.followingId)
    )).returning()
}