const db = require("../db/prisma");

exports.createProduct = async (req, res) => {
    const {productName, description, price, stock, category, images} = req.body;
    if(!productName || !price || !category){        
        return res.status(400).json({
            status: false,
            massage: "Product, harga, dan kategori harus di isi!!!"
        })
    }
    try {
        const createProduct = await db.products.create({
            data:{
                productName: productName || '',
                price: price || '',
                description: description ||'',
                category: category || '',
                stock: stock || '',
                images: images || ''
            }
        })
        return res.status(200).json({
            status: true,
            massage: "data berhasil dibuat!!!",
            data: createProduct
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: false,
            massage: "Internal server error!!"
        })
    }
}

exports.readProduct = async (req, res) => {
    const {id} = req.params
    let product;
    try {
    if (id) {
        product = await db.products.findUnique({
        where: {
            id: parseInt(id)
        }
    })   
    if(!product){
        return res.status(404).json({
            status: false,
            massage: "data not found!!"
        })
    }
    } else {
        product= await db.products.findMany()
        if (product.length === 0) {
            return res.status(404).json({
                status: false,
                massage: "Product belum ditambahkan!!!"
            })
        }
    }
    return res.status(200).json({
        status: true,
        data: product
    })
    } catch (error) {
        return res.status(500).json({
            status: false,
            massage: "Internal server error"
        })
    }
    
}

exports.updateProduct = async (req, res) => {
    const {id} = req.params
    if(!id){
        return res.status(404).json({
            status: false,
            massage: "Id is required"
        })
    }
    try {
        const {productName, description, price, stock, category, images, status} = req.body
        const existProduct = await db.products.findFirst({
            where: {
                id: parseInt(id)
            }
        })
        if(!existProduct){
            return res.status(404).json({
                status: false,
                massage: "Data not found"
            })
        }
        const updateData = await db.products.update({
            where: {
                productName: productName || '',
                description: description || '',
                price: price || '',
                stock: stock || '',
                category: category || '',
                images: images || '',
                status: status || ''
            }
        })
        return res.status(200).json({
            status: false,
            massage: "Data berhasil di update",
            data: updateData
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            massage: "Internal server error!!!"
        })
    }
}

exports.deleteProduct = async (req, res) => {
    const {id} = req.params
    if(!id){
        return res.status(404).json({
            status: false,
            massage: "Id is required!!!"
        })
    }
    try {
        const existData = await db.products.findUnique({
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
        await db.products.delete({
            where: {
                id: parseInt(id) 
            }
        })
        return res.status(200).json({
            status: false,
            massage: "Data Berhasil dihapus!!"
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            Massage: "Internal server error!!"
        })
    }
}