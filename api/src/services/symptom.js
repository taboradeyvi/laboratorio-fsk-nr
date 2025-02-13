import symptomSchema from "../schemas/symptom.js";
import patientSchema from "../schemas/patient.js";

class SymptomService {
  async create(symptom) {
    const exists = await symptomSchema.exists({ name: symptom.name });
    if (exists) {
      const error = new Error(`${symptom.name} already exists`);
      error.status = 400;
      throw error;
    }

    return await symptomSchema.create(symptom);
  }

  async update(id, symptom) {
    const exists = await symptomSchema.exists({
      name: symptom.name,
      _id: { $ne: id },
    });

    if (exists) {
      const error = new Error(
        `There is already a symptom with a name ${symptom.name}`
      );

      error.status = 400;
      throw error;
    }

    return await symptomSchema.updateOne({ _id: id }, symptom, { new: true });
  }

  async delete(id) {
    const exists = await symptomSchema.findById(id);
    if (exists === null) {
      const error = new Error("Symptom not found");
      error.status = 404;
      throw error;
    }

    return await symptomSchema.deleteOne({ _id: id });
  }

  async getAll(skip, limit) {
    return await symptomSchema.find().skip(skip).limit(limit);
  }

  async getAvailableSymptoms(patientId) {
    const exists = await patientSchema.findById(patientId);
    if (exists === null) {
      const error = new Error("Patient not found");
      error.status = 404;
      throw error;
    }

    const allSymptoms = await symptomSchema.find();

    const patientSymptoms = exists.symptoms.map((symptom) =>
      symptom._id.toString()
    );

    const availableSymptoms = allSymptoms.filter(
      (symptom) => !patientSymptoms.includes(symptom._id.toString())
    );

    return availableSymptoms;
  }

  async count() {
    return await symptomSchema.countDocuments();
  }

  async getById(id) {
    const exists = await symptomSchema.findById(id);
    if (exists === null) {
      const error = new Error("Symptom not found");
      error.status = 404;
      throw error;
    }

    return exists;
  }
}

export default new SymptomService();
