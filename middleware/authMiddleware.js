
import jwt from "jsonwebtoken";

const multiFactorAuth = (req, res, next) => {

    const token = req.headers.authorization;
    const otp = req.headers.otp;

    if (!token) {
        return res.status(401).json({ message: "Token missing" });
    }

    try {
        const decoded = jwt.verify(token, "secretkey");

        if (otp !== "123456") {
            return res.status(401).json({ message: "Invalid OTP" });
        }

        req.user = decoded;
        next();

    } catch (error) {
        res.status(401).json({ message: "Invalid Token" });
    }
};

export default multiFactorAuth;
