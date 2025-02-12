import Patient from "../schemas/patient.js";

class PatientService {
  async create(patient) {
    const exists = await Patient.exists({
      firstName: patient.firstName,
      lastName: patient.lastName,
    });

    if (exists) {
      const error = new Error("Patient already exists");
      error.status = 400;
      throw error;
    }

    return await Patient.create(patient);
  }

  async update(id, patient) {
    const exists = await Patient.exists({
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

    return await Patient.updateOne({ _id: id }, patient, { new: true });
  }

  async delete(id) {
    const exists = await Patient.findById(id);
    if (exists === null) {
      const error = new Error("Patient not found");
      error.status = 404;
      throw error;
    }

    return await Patient.deleteOne({ _id: id });
  }

  async getAll() {
    return await Patient.find();
  }

  async getById(id) {
    const exists = await Patient.findById(id);
    if (exists === null) {
      const error = new Error("Patient not found");
      error.status = 404;
      throw error;
    }

    return exists;
  }
}

export default new PatientService();
