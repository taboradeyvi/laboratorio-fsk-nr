import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      maxLength: 50,
      trim: true,
      required: [true, "FisrtName is required"],
    },
    lastName: {
      type: String,
      maxLength: 50,
      trim: true,
      required: [true, "LastName is required"],
    },
    userName: {
      type: String,
      maxLength: 50,
      unique: true,
      trim: true,
      required: [true, "UserName is required"],
    },
    email: {
      type: String,
      maxLength: 100,
      trim: true,
      required: [true, "Email is required"],
    },
    phoneNumber: {
      type: String,
      maxLength: 50,
      trim: true,
      validate: {
        validator: function (v) {
          return /^\+?\d{1,3}[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{3,4}[-.\s]?\d{4}$/.test(
            v
          );
        },
        message: (props) => `${props.value} is not a valid PhoneNumber`,
      },
      required: [true, "PhoneNumber is required"],
    },
    password: {
      type: String,
      minLength: 8,
      required: [true, "Password is required"],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  { timestamps: true, collection: "users" }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const user = mongoose.model("User", userSchema);

export default user;
