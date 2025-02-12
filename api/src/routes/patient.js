import express from "express";
const route = express.Router();
import patientController from "../controllers/patient.js";

/**
 * @openapi
 * /patients:
 *   get:
 *     summary: Get all patients
 *     tags: [Patients]
 *     responses:
 *       200:
 *         description: List of patients retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   firstName:
 *                     type: string
 *                     description: First name of the patient
 *                   lastName:
 *                     type: string
 *                     description: Last name of the patient
 *                   address:
 *                     type: string
 *                     description: Address of the patient
 *                   birthday:
 *                     type: string
 *                     format: date
 *                     description: Patient's birthdate
 *                   phoneNumbers:
 *                     type: array
 *                     items:
 *                       type: string
 *                       description: Phone number of the patient
 *                   emails:
 *                     type: array
 *                     items:
 *                       type: string
 *                       description: Email of the patient
 *                   symptoms:
 *                     type: array
 *                     items:
 *                       type: string
 *                       description: List of symptoms associated with the patient
 *       500:
 *         description: Internal server error
 */
route.get("/", patientController.getAll);

/**
 * @openapi
 * /patients/{id}:
 *   get:
 *     summary: Get a patient by their ID
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the patient
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Patient found successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 address:
 *                   type: string
 *                 birthday:
 *                   type: string
 *                   format: date
 *                 phoneNumbers:
 *                   type: array
 *                   items:
 *                     type: string
 *                 emails:
 *                   type: array
 *                   items:
 *                     type: string
 *                 symptoms:
 *                   type: array
 *                   items:
 *                     type: string
 *       404:
 *         description: Patient not found
 *       500:
 *         description: Internal server error
 */
route.get("/:id", patientController.getById);

/**
 * @openapi
 * /patients:
 *   post:
 *     summary: Create a new patient
 *     tags: [Patients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - address
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               address:
 *                 type: string
 *               birthday:
 *                 type: string
 *                 format: date
 *               phoneNumbers:
 *                 type: array
 *                 items:
 *                   type: string
 *               emails:
 *                 type: array
 *                 items:
 *                   type: string
 *               symptoms:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Patient created successfully
 *       400:
 *         description: Data validation error
 *       500:
 *         description: Internal server error
 */
route.post("/", patientController.create);

/**
 * @openapi
 * /patients/{id}:
 *   put:
 *     summary: Update a patient by their ID
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the patient
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
 *               lastName:
 *                 type: string
 *               address:
 *                 type: string
 *               birthday:
 *                 type: string
 *                 format: date
 *               phoneNumbers:
 *                 type: array
 *                 items:
 *                   type: string
 *               emails:
 *                 type: array
 *                 items:
 *                   type: string
 *               symptoms:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Patient updated successfully
 *       400:
 *         description: Data validation error
 *       404:
 *         description: Patient not found
 *       500:
 *         description: Internal server error
 */
route.put("/:id", patientController.update);

/**
 * @openapi
 * /patients/{id}:
 *   delete:
 *     summary: Delete a patient by their ID
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the patient
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Patient deleted successfully
 *       404:
 *         description: Patient not found
 *       500:
 *         description: Internal server error
 */
route.delete("/:id", patientController.remove);

export default route;
