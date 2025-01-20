import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name of the user"],
  },
  email: {
    type: String,
    required: [true, "Please provide email of the user"],
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    select: false, // on accessing the find all api this will not give passsword in teh response
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm, your password"],

    //for validation of the passwords entered by user
    validate: {
      validator: function (val) {
        return this.password === val;
      },
      message: "Passwords are not same",
    },

    select: false,
  },
  cartItems: {
    type: [Object],
    required: false,
    default: [],
  },
});

// pre hook to encryopt the password and set the passwordConfirm to undefined

userSchema.pre("save", async function (next) {
  console.log(await bcrypt.hash(this.password, 12));
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;

  next();
});

const User = mongoose.model("User", userSchema);

export default User;
