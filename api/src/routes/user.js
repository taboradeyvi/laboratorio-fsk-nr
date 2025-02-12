import express from "express";
const route = express.Router();
import userController from "../controllers/user.js";
import { checkToken } from "../helper/jwt.js";

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: User ID
 *                   firstName:
 *                     type: string
 *                     description: First name of the user
 *                   lastName:
 *                     type: string
 *                     description: Last name of the user
 *                   userName:
 *                     type: string
 *                     description: Unique username of the user
 *                   email:
 *                     type: string
 *                     description: Email address of the user
 *                   phoneNumber:
 *                     type: string
 *                     description: Phone number of the user
 *                   role:
 *                     type: string
 *                     enum: [admin, user]
 *                     description: Role of the user
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: Date and time the user was created
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: Date and time the user was last updated
 *       500:
 *         description: Internal server error
 */
route.get("/", checkToken, userController.getAll);

/**
 * @openapi
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 userName:
 *                   type: string
 *                 email:
 *                   type: string
 *                 phoneNumber:
 *                   type: string
 *                 role:
 *                   type: string
 *                   enum: [admin, user]
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
route.get("/:id", checkToken, userController.getById);

/**
 * @openapi
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - userName
 *               - email
 *               - phoneNumber
 *               - password
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: First name of the user
 *               lastName:
 *                 type: string
 *                 description: Last name of the user
 *               userName:
 *                 type: string
 *                 description: Unique username of the user
 *               email:
 *                 type: string
 *                 description: Email address of the user
 *               phoneNumber:
 *                 type: string
 *                 description: Phone number of the user
 *               password:
 *                 type: string
 *                 description: Password of the user (minimum 8 characters)
 *               role:
 *                 type: string
 *                 enum: [admin, user]
 *                 description: Role of the user (default is "user")
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Data validation error
 *       500:
 *         description: Internal server error
 */
route.post("/", userController.create);

/**
 * @openapi
 * /users/login:
 *   post:
 *     summary: Authenticate a user and generate a token
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userName
 *               - password
 *             properties:
 *               userName:
 *                 type: string
 *                 description: Username of the user
 *               password:
 *                 type: string
 *                 description: User's password
 *     responses:
 *       200:
 *         description: Authentication successful, returns a JWT token
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */
route.post("/login", checkToken, userController.login);

/**
 * @openapi
 * /users/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: Updated first name of the user
 *               lastName:
 *                 type: string
 *                 description: Updated last name of the user
 *               userName:
 *                 type: string
 *                 description: Updated username of the user
 *               email:
 *                 type: string
 *                 description: Updated email address of the user
 *               phoneNumber:
 *                 type: string
 *                 description: Updated phone number of the user
 *               role:
 *                 type: string
 *                 enum: [admin, user]
 *                 description: Updated role of the user
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Data validation error
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
route.put("/:id", checkToken, userController.update);

/**
 * @openapi
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
route.delete("/:id", checkToken, userController.remove);

export default route;
