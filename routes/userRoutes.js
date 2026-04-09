
import express from "express";
import User from "../models/userModel.js";
import multiFactorAuth from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", async (req,res)=>{
    const {name,email,password} = req.body;

    const user = new User({name,email,password});
    await user.save();

    res.json({message:"User logged in",user});
});

router.post("/logout", multiFactorAuth, async (req,res)=>{
    const user = await User.findById(req.user.id);

    user.logoutTime = new Date();
    await user.save();

    res.json({message:"User logged out"});
});

router.delete("/delete/:id", async (req,res)=>{
    await User.findByIdAndUpdate(req.params.id,{deleted:true});
    res.json({message:"User soft deleted"});
});

export default router;
