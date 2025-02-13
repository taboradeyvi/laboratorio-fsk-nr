import express from "express";
const route = express.Router();
import patientController from "../controllers/patient.js";
import { checkToken } from "../helper/jwt.js";

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
route.get("/", checkToken, patientController.getAll);

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
route.get("/:id", checkToken, patientController.getById);

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
route.post("/", checkToken, patientController.create);

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
route.put("/:id", checkToken, patientController.update);

/**
 * @openapi
 * /patients/{patientId}/symptoms:
 *   post:
 *     summary: Add symptoms to a patient
 *     description: Adds one or more symptoms to a specific patient.
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         description: The ID of the patient to whom the symptoms will be added
 *         schema:
 *           type: string
 *     requestBody:
 *       description: An array of symptom IDs to add to the patient
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               symptomIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["5f8f8f8f8f8f8f8f8f8f8f8f", "5f8f8f8f8f8f8f8f8f8f8f8g"]
 *     responses:
 *       200:
 *         description: Symptoms successfully added to the patient
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Symptoms added to patient successfully"
 *       400:
 *         description: Invalid request, e.g., missing symptom IDs
 *       404:
 *         description: Patient not found or one of the symptoms doesn't exist
 *       500:
 *         description: Internal server error
 */
route.post("/:id/symptoms", checkToken, patientController.addSymptoms);

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
route.delete("/:id", checkToken, patientController.remove);

export default route;
