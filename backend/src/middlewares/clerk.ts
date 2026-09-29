import {getAuth } from '@clerk/express'
import type {NextFunction, Request, Response} from "express"

async function checkAuth(req:Request, res:Response, next:NextFunction) {
    const { isAuthenticated } = getAuth(req)

    // If user isn't authenticated, return a 401 error
    if (!isAuthenticated) {
        res.status(401).json({ error: 'User not authenticated' })
        return
    }

    next()
}

export default checkAuth;