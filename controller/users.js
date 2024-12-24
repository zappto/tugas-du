const db = require("../db/prisma")

exports.getAllUsers = async (req, res) => {
    const {id} = req.params
    let users;
    try {
        if(id){
            users = await db.user.findUnique({
                where: {
                    id: parseInt(id)
                }
            })
        }else{
            users = await db.user.findMany()
            if(users.length === 0){
                return res.status(404).json({
                    status: false,
                    massage: "user belum ditambahkan!!!"
                })
            }
        }
        return res.status(200).json({
            status: true,
            data: users
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            masssage: "Internal server error!!"
        })
    }
}


exports.updateUsers = async (req, res) => {
    const {id} = req.params
    const {username} = req.body
    if(!username){
        return res.status(404).json({
            status: false,
            massage: "Username is required!!!"
        })
    }
    if (!id) {
        return res.status(404).json({
            status: false,
            massage: "Id is required!!!"
        })
    }
    try {
        const existUsers = await db.user.findFirst({
            where: {
                id: parseInt(id)
            }
        })
        if (!existUsers) {
            return res.status(404).json({
                status: false,
                massage: "User not found!!!"
            })
        }
        const updateUsers = await db.user.update({
            where: {
                id: parseInt(id),
            }, 
            data: {
                username
            }
        })
        return res.status(200).json({
            status: true,
            massage: "Users berhasil diupdate",
            data: updateUsers
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: false,
            massage: "Internal server error!!!"
        })
    }
}

exports.deleteUsers = async (req, res) => {
    const {id} = req.params
    if(!id){
        return res.status(404).json({
            status: false,
            massage: "Id is required!!!"
        })
    }
    try {
        const existData = await db.user.findUnique({
            where: {
                id: parseInt(id)
            }
        })
        if (!existData){
            return res.status(404).json({
                status: false,
                masssage: "Data not found!!"
            })
        }
        await db.user.delete({
            where: {
                id: parseInt(id) 
            }
        })
        return res.status(200).json({
            status: true,
            massage: "Data Berhasil dihapus!!"
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            Massage: "Internal server error!!"
        })
    }
}