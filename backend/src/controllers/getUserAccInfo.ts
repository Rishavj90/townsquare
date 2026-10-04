import { followerCount, followingCount, myLike, myMedia, myPost, myReply, myRepost, mySave, userInfo } from "../db/queries/user_activity"
import type { Request, Response } from "express"

export const userAccInfo = async (req: Request, res:Response)=>{
    try {
        const data = await userInfo(req.body.id)
        const followerNum = await followerCount(req.body.id)
        const followingNum = await followingCount(req.body.id)
        return res.json({
            ...data,
            followerNum,
            followingNum
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            error: "server error"
        })
    }
}

export const post = async (req: Request, res:Response)=>{
    try {
        const data = await myPost(req.body.id)
        return res.json(data)  
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            error: "server error"
        })
    }
}

export const reply = async (req: Request, res:Response)=>{
    try {
        const data = await myReply(req.body.id)
        return res.json(data)
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            error: "server error"
        })
    }
}

export const repost = async (req: Request, res:Response)=>{
    try {
        const data = await myRepost(req.body.id)
        return res.json(data)
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            error: "server error"
        })
    }
}
export const like = async (req: Request, res:Response)=>{
    try {
        const data = await myLike(req.body.id)
        return res.json(data)
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            error: "server error"
        })
    }
}
export const save = async (req: Request, res:Response)=>{
    try {
        const data = await mySave(req.body.id)
        return res.json(data)
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            error: "server error"
        })
    }
}
export const media = async (req: Request, res:Response)=>{
    try {
        const data = await myMedia(req.body.id)
        return res.json(data)
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            error: "server error"
        })
    }
}