

import jwt from "jsonwebtoken";



export const authenticateAdmin = async (req,res, next) => {
    try {
        
const JWT_SECRET = process.env.JWT_SECRET
        const authHeader = req.header("Authorization");
        const token = authHeader?.replace("Bearer", "").trim()

        if (!token) {
            return res.error("Access Denied: not token provided").status(400)
        }

        const decoded = jwt.verify(token, JWT_SECRET)

        if (!decoded || typeof decoded !== "object") {
        return res.json("Access Denied: only admin users are allowed").status(400)
        }

        await next()
    } catch (error) {
        return res.json("invalid token").status(401)
    }

} 