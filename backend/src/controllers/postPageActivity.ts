import type { Request, Response } from "express"
import {
    getPost,
    getUsersWhoLiked,
    getUsersWhoRepost 
} from "../db/queries/post_activity"

export const getPostFunc = async (req:Request, res:Response)=>{
    try {
        const data = await getPost(req.body.postId)
        return res.json(data)
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            error: "server error"
        })
    }
}

export const getUsersWhoLikedPostFunc = async (req:Request, res:Response)=>{
    try {
        const data = await getUsersWhoLiked(req.body.postId)
        return res.json(data)
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            error: "server error"
        })
    }
}

export const getUsersWhoRepostedPostFunc = async (req:Request, res:Response)=>{
    try {
        const data = await getUsersWhoRepost(req.body.postId)
        return res.json(data)
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            error: "server error"
        })
    }
}
