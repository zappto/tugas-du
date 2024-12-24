const express = require("express");
const { createProduct, readProduct, updateProduct, deleteProduct } = require("../controller/products");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddlewares");

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - productName
 *         - price
 *         - category
 *       properties:
 *         productName:
 *           type: string
 *           description: The name of the product
 *         description:
 *           type: string
 *           description: A brief description of the product
 *         price:
 *           type: number
 *           description: The price of the product
 *         stock:
 *           type: integer
 *           description: The stock quantity
 *         category:
 *           type: string
 *           description: The category of the product
 *         images:
 *           type: string
 *           description: The URL of the product image
 *       example:
 *         productName: Smartphone
 *         description: High-end smartphone with 128GB storage
 *         price: 799.99
 *         stock: 50
 *         category: Electronics
 *         images: http://example.com/image.jpg
 */

/**
 * @swagger
 * /createProduct:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Product successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 massage:
 *                   type: string
 *                   example: data berhasil dibuat!!!
 *                 data:
 *                   $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.post("/createProduct", createProduct);

/**
 * @swagger
 * /readProduct/{id}:
 *   get:
 *     summary: Get a product by ID or all products if no ID is provided
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: false
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Product(s) retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal Server Error
 */
router.get("/readProduct/:id?", readProduct);

/**
 * @swagger
 * /updateProduct/{id}:
 *   put:
 *     summary: Update an existing product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Product successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 massage:
 *                   type: string
 *                   example: Data berhasil di update
 *                 data:
 *                   $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal Server Error
 */
router.put('/updateProduct/:id', authMiddleware, updateProduct);

/**
 * @swagger
 * /deleteProduct/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Product successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 massage:
 *                   type: string
 *                   example: Data Berhasil dihapus!!
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal Server Error
 */
router.delete('/deleteProduct/:id', authMiddleware, deleteProduct);

module.exports = router;
