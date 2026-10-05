import { Router } from "express";
import checkAuth from "../middlewares/clerk";
import { clerkMiddleware } from "@clerk/express";
import {
    newPostFunc,
    newLikeFunc,
    newRepostFunc,
    newSaveFunc,
    newFollowFunc,
    deletePostFunc,
    deleteLikeFunc,
    deleteRepostFunc,
    deleteSaveFunc,
    deleteFollowFunc 
} from "../controllers/userActivity";


const router = Router()

router.post("/:id/newPost", clerkMiddleware, checkAuth, newPostFunc)
router.post("/:id/newLike", clerkMiddleware, checkAuth, newLikeFunc)
router.post("/:id/newRepost", clerkMiddleware, checkAuth, newRepostFunc)
router.post('/:id/newSave', clerkMiddleware, checkAuth, newSaveFunc)
router.post('/:id/newFollow', clerkMiddleware, checkAuth, newFollowFunc)

router.post("/:id/deletePost", clerkMiddleware, checkAuth, deletePostFunc)
router.post("/:id/deleteLike", clerkMiddleware, checkAuth, deleteLikeFunc)
router.post("/:id/deleteRepost", clerkMiddleware, checkAuth, deleteRepostFunc)
router.post('/:id/deleteSave', clerkMiddleware, checkAuth, deleteSaveFunc)
router.post('/:id/deleteFollow', clerkMiddleware, checkAuth, deleteFollowFunc)



export default router