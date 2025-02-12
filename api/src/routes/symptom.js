import express from "express";
const route = express.Router();
import symptomController from "../controllers/symptom.js";

/**
 * @openapi
 * /symptoms:
 *   get:
 *     summary: Get all symptoms
 *     tags: [Symptoms]
 *     responses:
 *       200:
 *         description: List of symptoms retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: Symptom ID
 *                   name:
 *                     type: string
 *                     description: Name of the symptom
 *                   description:
 *                     type: string
 *                     description: Description of the symptom
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: Date and time the symptom was created
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: Date and time the symptom was last updated
 *       500:
 *         description: Internal server error
 */
route.get("/", symptomController.getAll);

/**
 * @openapi
 * /symptoms/{id}:
 *   get:
 *     summary: Get a symptom by its ID
 *     tags: [Symptoms]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Symptom ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Symptom found successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Symptom not found
 *       500:
 *         description: Internal server error
 */
route.get("/:id", symptomController.getById);

/**
 * @openapi
 * /symptoms:
 *   post:
 *     summary: Create a new symptom
 *     tags: [Symptoms]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the symptom
 *               description:
 *                 type: string
 *                 description: Detailed description of the symptom
 *     responses:
 *       201:
 *         description: Symptom created successfully
 *       400:
 *         description: Data validation error
 *       500:
 *         description: Internal server error
 */
route.post("/", symptomController.create);

/**
 * @openapi
 * /symptoms/{id}:
 *   put:
 *     summary: Update a symptom by its ID
 *     tags: [Symptoms]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Symptom ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Updated name of the symptom
 *               description:
 *                 type: string
 *                 description: Updated description of the symptom
 *     responses:
 *       200:
 *         description: Symptom updated successfully
 *       400:
 *         description: Data validation error
 *       404:
 *         description: Symptom not found
 *       500:
 *         description: Internal server error
 */
route.put("/:id", symptomController.update);

/**
 * @openapi
 * /symptoms/{id}:
 *   delete:
 *     summary: Delete a symptom by its ID
 *     tags: [Symptoms]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Symptom ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Symptom deleted successfully
 *       404:
 *         description: Symptom not found
 *       500:
 *         description: Internal server error
 */
route.delete("/:id", symptomController.remove);

export default route;
