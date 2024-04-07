const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { boolean } = require("webidl-conversions");
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        name: {
            type: String,
            require: true
        },
        email: {
            type: String,
            require: true
        },
        password: {
            type: String,
            require: true
        },
        birth: {
            type: Date,
            default: "01-01-1990",
        },
        gender: {
            type: String,
            enum: ["Nam", "Nữ"],
            default: "Nam",
        },
        phone: {
            type: String,
            require: false
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        }
    },
    {
        timestamps: true,
    }
)

userSchema.pre("save", async function (next) {
  try {
    const user = this;
    if (user.isModified("password")) {
      user.password = await bcrypt.hash(user.password, 8);
    }
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
