const express = require("express");
const route = express.Router();
const { getAllUsers, updateUsers, deleteUsers } = require('../controller/users');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The user ID
 *         username:
 *           type: string
 *           description: The username of the user
 *       example:
 *         id: 1
 *         username: johndoe
 */

/**
 * @swagger
 * /read/{id}:
 *   get:
 *     summary: Get user(s) by ID or all users if no ID is provided
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: false
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User(s) retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       404:
 *         description: User(s) not found
 *       500:
 *         description: Internal Server Error
 */
route.get('/read/:id?', getAllUsers);

/**
 * @swagger
 * /update/{id}:
 *   put:
 *     summary: Update a user's information
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The new username
 *             example:
 *               username: newusername
 *     responses:
 *       200:
 *         description: User successfully updated
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
 *                   example: Users berhasil diupdate
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found or invalid ID/username
 *       500:
 *         description: Internal Server Error
 */
route.put('/update/:id', updateUsers);

/**
 * @swagger
 * /delete/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User successfully deleted
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
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
route.delete('/delete/:id', deleteUsers);

module.exports = route;
