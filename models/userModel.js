
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    loginTime: Date,
    logoutTime: Date,
    lastActive: Date,
    deleted: {
        type: Boolean,
        default: false
    }
});

userSchema.pre("save", function(next){
    if(this.isNew){
        this.loginTime = new Date();
    }
    this.lastActive = new Date();
    next();
});

userSchema.pre(/^find/, function(next){
    this.find({deleted:false});
    next();
});

const User = mongoose.model("User", userSchema);

export default User;
