const jwt = require("jsonwebtoken")
const env = require("dotenv")
env.config()

const createToken = async (username, password) => {
    const encodeUsername = Buffer.from(`${username}:${password}`).toString('base64')
    return jwt.sign({data: encodeUsername}, process.env.JWT_SECRET, {expiresIn: "1h"})
}

const decode = (Token) => {
    const decoded = Buffer.from(Token, "base64").toString('utf-8')
    const [username, password] = decoded.split(':')
    return {username, password}
}

const verifyToken = async(Token) => {
    return jwt.verify(Token, process.env.JWT_SECRET)

}
module.exports = {
    createToken,
    verifyToken,
    decode
}