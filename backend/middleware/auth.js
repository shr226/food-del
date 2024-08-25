import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    const token = req.headers.token;
    if (!token) {
        return res.status(401).json({ success: false, message: "Not Authorized. Login Again" });
    }
    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = tokenDecode.id;
        next();
    } catch (error) {
        
        console.error(error);
        res.json({ success: false, message: "Server Error" });
    }
};

export default authMiddleware;
