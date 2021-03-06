import { Schema } from "mongoose";
import mongoose from "../database/mongoDB";
import bcrypt from "bcryptjs";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        index: { unique: true }
    },
    password: {
        type: String,
        required: true
    }
});

function updatePassword(user, next) {
    bcrypt.genSalt(10, function (err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
}

// Pre-save method for the User schema
userSchema
    .pre("save", function (next) {
        updatePassword(this, next);
    });

userSchema.methods.comparePassword = function (password, next) {
    bcrypt.compare(password, this.password, function (err, isMatch) {
        if (err) return next(err);

        return next(null, isMatch);
    });
}

export default mongoose.model("User", userSchema);