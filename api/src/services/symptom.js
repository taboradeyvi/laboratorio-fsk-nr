import Symptom from "../schemas/symptom.js";

class SymptomService {
  async create(symptom) {
    const symptom = await Symptom.exists({ name: symptom.name });
    if (symptom) {
      const error = new Error(`${symptom.name} already exists`);
      error.status = 400;
      throw error;
    }

    return await Symptom.create(symptom);
  }

  async update(id, symptom) {
    const symptom = await Symptom.exists({
      name: symptom.name,
      _id: { $ne: id },
    });

    if (symptom) {
      const error = new Error(
        `There is already a symptom with a name ${symptom.name}`
      );

      error.status = 400;
      throw error;
    }

    return await Symptom.updateOne({ _id: id }, symptom, { new: true });
  }

  async delete(id) {
    const exists = await Symptom.findById(id);
    if (exists === null) {
      const error = new Error("Symptom not found");
      error.status = 404;
      throw error;
    }

    return await Symptom.deleteOne({ _id: id });
  }

  async getAll() {
    return await Symptom.find();
  }

  async getById(id) {
    const exists = await Symptom.findById(id);
    if (exists === null) {
      const error = new Error("Symptom not found");
      error.status = 404;
      throw error;
    }

    return exists;
  }
}

export default new SymptomService();
