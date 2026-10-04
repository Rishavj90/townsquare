import type { Request, Response } from "express"
import { 
    deleteLike, 
    deletePost, 
    deleteRepost, 
    deleteSave, 
    followUser, 
    newLike, 
    newPost, 
    newRepost, 
    newSave, 
    unfollowUser 
} from "../db/queries/crud_activity"
import { getAuth } from '@clerk/express'


export const newPostFunc = async (req:Request, res:Response)=>{
    try {
        const data = await newPost(req.body.postData, req.body.mediaData)
        return res.json(data)
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            error: "server error"
        })
    }
}

export const newLikeFunc = async (req:Request, res:Response)=>{
    try {
        const data = await newLike({
            userId: getAuth(req).userId as string,
            postId: req.body.postId as string
        })
        return res.json(data)
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            error: "server error"
        })
    }
}

export const newRepostFunc = async (req:Request, res:Response)=>{
    try {
        const data = await newRepost({
            userId: getAuth(req).userId as string,
            postId: req.body.postId as string
        })
        return res.json(data)
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            error: "server error"
        })
    }
}

export const newSaveFunc = async (req:Request, res:Response)=>{
    try {
        const data = await newSave({
            userId: getAuth(req).userId as string,
            postId: req.body.postId as string
        })
        return res.json(data)
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            error: "server error"
        })
    }
}

export const newFollowFunc = async (req:Request, res:Response)=>{
    try {
        const data = await followUser({
            userId: getAuth(req).userId as string,
            followingId: req.body.followingId as string
        })
        return res.json(data)
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            error: "server error"
        })
    }
}



export const deletePostFunc = async (req:Request, res:Response)=>{
    try {
        const post = {
            id: req.body.postId,
            authorId: req.body.authorId
        }
        const { userId } = getAuth(req)
        
        if(post.authorId===userId){
            const data = await deletePost(post.id as string)
            return res.json(data)
        }else{
            return res.status(403).json({
                error: "Not Allowed"
            })
        }
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            error: "server error"
        })
    }
}

export const deleteLikeFunc = async (req:Request, res:Response)=>{
    try {
        const data = await deleteLike({
            userId : getAuth(req).userId as string,
            postId: req.body.postId as string
        })
        return res.json(data)
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            error: "server error"
        })
    }
}

export const deleteRepostFunc = async (req:Request, res:Response)=>{
    try {
        const data = await deleteRepost({
            userId : getAuth(req).userId as string,
            postId: req.body.postId as string
        })
        return res.json(data)
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            error: "server error"
        })
    }
}

export const deleteSaveFunc = async (req:Request, res:Response)=>{
    try {
        const data = await deleteSave({
            userId : getAuth(req).userId as string,
            postId: req.body.postId as string
        })
        return res.json(data)
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            error: "server error"
        })
    }
}

export const deleteFollowFunc = async (req:Request, res:Response)=>{
    try {
        const data = await unfollowUser({
            userId : getAuth(req).userId as string,
            followingId: req.body.followingId as string
        })
        return res.json(data)
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            error: "server error"
        })
    }
}






