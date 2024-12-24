const jwt = require("jsonwebtoken")

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers["authorization"]
    if (!authHeader) {
        return res.status(401).json({
            status: false,
            massage: "Unauthorized"
        })
    }
    const token = authHeader.split(" ")[1]
    try {
        jwt.verify(token, process.env.JWT_SECRET)
        next()
    } catch (error) {
        if(error instanceof jwt.TokenExpiredError){
            return res.status(401).json({
                status: false,
                massage: "Token expired"
            })
        }
        return res.status(401).json({
            status: false,
            massage: "Unauthorized"
        })
    }
}

module.exports = authMiddleware