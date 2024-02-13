const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  firstname: {
     type: String,
     require: true,
     trim: true,
     min: 3,
     max: 20,
  },
  lastname: {
     type: String,
     require: true,
     trim: true,
     min: 3,
     max: 20,
  },
  email: {
     type: String,
     require: true,
     trim: true,
     unique: true,
     lowercase: true,
  },
  password: {
     type: String,
     require: true,
  },
  role: {
     type: String,
     enum: ["user", "admin"],
     default: "user",
  },
  Phonenumber: {
     type: String || Number ,
     require: true,
  }
},{ timestamps: true });
//For get fullName from when we get data from database
userSchema.pre('save', async function (next) {
   const user = this;
   if (user.isModified('password')) {
       const salt = await bcrypt.genSalt(10);
       user.password = await bcrypt.hash(user.password, salt);
   }
   next();
});
userSchema.virtual("fullName").get(function () {
   return `${this.firstname} ${this.lastname}`;
 });

module.exports = mongoose.model("User", userSchema);