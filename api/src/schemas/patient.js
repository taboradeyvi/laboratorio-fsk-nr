import mongoose from "mongoose";
const { Schema } = mongoose;

const patientSchema = new Schema(
  {
    firstName: {
      type: String,
      maxLength: 50,
      required: [true, "FirstName is required"],
    },
    lastName: {
      type: String,
      maxLength: 50,
      required: [true, "LastName is required"],
    },
    address: {
      type: String,
      maxLength: 300,
      minLength: 15,
      required: [true, "Address is required"],
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
            /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)
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
  { timestamps: true }
);

const patient = mongoose.model("Patient", patientSchema);

export default patient;
