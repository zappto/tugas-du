const db = require('../db/prisma');
const bcrypt = require('bcrypt');
const {createToken, verifyToken, decode} = require("../functions/jwt");

exports.register = async (req, res) => {
    try {
        const {username, password} = req.body;
        if(!username || !password){
            return res.status(400).json({
                status: false,
                massage: "username dan password harus diisi"
            })
    }
    const usernameExist = await db.user.findUnique({
        where: {
            username: username
        }
    })
    if(usernameExist){
        return res.status(400).json({
            status: false,
            massage: "username sudah ada"
        })
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await db.user.create({
        data: {
            username: username,
            password: hashPassword
        }
    })
    res.status(200).json({
        status: true,
        massage: "user berhasil dibuat",
        data: user
    })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: false,
            massage: "internal server error"
        })
    }
}

exports.login = async (req, res) => {
    try {
    const {username, password} = req.body
    if (!username || !password) {
        return res.status(400).json({
            status: false,
            massage: "username dan password harus di isi"
        })
    }
    const user = await db.user.findFirst({
        where: {
            username: username
        }
    })
    if(!user){
        return res.status(404).json({
            status: false,
            massage: "user not found"
        })
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
        return res.status(400).json({
            status: false,
            massage: "username atau password tidak valid"
        })
    }
    const createTokens = await createToken(username, password)

    const updateUser = await db.user.update({
        where:{
            id: user.id,
        },
        data:{
            token: createTokens
        }
    })
    const verify = await verifyToken(updateUser.token)
    const originalData = await decode(verify.data)
    res.status(200).json({
        status: true,
        massage: "login succesfully",
        data: originalData
    })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: false,
            massage: "internal server error"
        })
    }
}

