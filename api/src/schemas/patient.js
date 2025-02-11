import mongoose from "mongoose";
const { Schema } = mongoose;

const patientSchema = new Schema(
  {
    firstName: {
      type: String,
      maxLength: 50,
      required: [true, "FisrtName has been required"],
    },
    lastName: {
      type: String,
      maxLength: 50,
      required: [true, "LastName has been required"],
    },
    address: {
      type: String,
      maxLength: 300,
      minLength: 20,
      required: [true, "Address has been required"],
    },
    birthday: { type: Date, default: Date.now },
    phoneNumbers: {
      type: [String],
      validate: {
        validator: function (phoneNumbers) {
          return phoneNumbers.every((phoneNumber) =>
            /^\+?\d{1,3}[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{3,4}[-.\s]?\d{4}$/.test(
              phoneNumber
            )
          );
        },
        message: "One or more phone numbers are not in a valid format",
      },
    },
    emails: {
      type: [String],
      validate: {
        validator: function (emails) {
          return emails.every((email) =>
            /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)
          );
        },
        message: "One or more emails are not in a valid format.",
      },
    },
    symptoms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "symptoms",
      },
    ],
  },
  { timestamps: true, collection: "patients" }
);

export const Patient = mongoose.model("patients", patientSchema);
