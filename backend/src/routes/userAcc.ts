import { Router } from "express";
import checkAuth from "../middlewares/clerk";
import { clerkMiddleware } from "@clerk/express";
import { 
    userAccInfo, 
    post, 
    repost, 
    like, 
    save, 
    media 
} from "../controllers/getUserAccInfo";


const router = Router()

router.get("/:id/profile", clerkMiddleware, checkAuth, userAccInfo)
router.get("/:id/post", clerkMiddleware, checkAuth, post)
router.get("/:id/repost", clerkMiddleware, checkAuth, repost)
router.get('/:id/like', clerkMiddleware, checkAuth, like)
router.get('/:id/save', clerkMiddleware, checkAuth, save)
router.get('/:id/media', clerkMiddleware, checkAuth, media)




export default router