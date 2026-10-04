import { Router } from "express";
import checkAuth from "../middlewares/clerk";
import { userAccInfo, post, repost, like, save, media } from "../controllers/getUserAccInfo";


const router = Router()

router.get("/:id/profile", checkAuth, userAccInfo)
router.get("/:id/post", checkAuth, post)
router.get("/:id/repost", checkAuth, repost)
router.get('/:id/like', checkAuth, like)
router.get('/:id/save', checkAuth, save)
router.get('/:id/media', checkAuth, media)




export default router