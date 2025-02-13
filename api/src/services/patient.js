import patientSchema from "../schemas/patient.js";

class PatientService {
  async create(patient) {
    const exists = await patientSchema.exists({
      firstName: patient.firstName,
      lastName: patient.lastName,
    });

    if (exists) {
      const error = new Error("Patient already exists");
      error.status = 400;
      throw error;
    }

    return await patientSchema.create(patient);
  }

  async update(id, patient) {
    const exists = await patientSchema.exists({
      firstName: patient.firstName,
      lastName: patient.lastName,
      _id: { $ne: id },
    });

    if (exists) {
      const error = new Error(
        `There is already a patient with a name ${
          patient.firstName + " " + patient.lastName
        }`
      );

      error.status = 400;
      throw error;
    }

    return await patientSchema.updateOne({ _id: id }, patient, { new: true });
  }

  async addSymptoms(patientId, symptoms) {
    const patient = await patientSchema.findById(patientId);
    if (!patient) {
      throw new Error("Patient not found");
    }

    patient.symptoms = [...new Set([...patient.symptoms, ...symptoms])];

    await patient.save();
    return patient;
  }

  async delete(id) {
    const exists = await patientSchema.findById(id);
    if (exists === null) {
      const error = new Error("Patient not found");
      error.status = 404;
      throw error;
    }

    return await patientSchema.deleteOne({ _id: id });
  }

  async getAll(skip, limit) {
    return await patientSchema.find().skip(skip).limit(limit);
  }

  async count() {
    return await patientSchema.countDocuments();
  }

  async getById(id) {
    const exists = await patientSchema.findById(id);
    if (exists === null) {
      const error = new Error("Patient not found");
      error.status = 404;
      throw error;
    }

    return exists;
  }
}

export default new PatientService();
