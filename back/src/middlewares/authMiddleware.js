import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const adminSecretKey = process.env.SALT_KEY;

export const validateToken = (req, res, next, requiredRole) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authorizationHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, adminSecretKey);

    if (decoded.role !== requiredRole) {
      return res
        .status(403)
        .json({ message: "You are not authorized to perform this action" });
    }

    req.userRole = decoded.role;
    req.userId = decoded.id;

    next();
  } catch (err) {
    return res
      .status(403)
      .json({ message: "Invalid token", error: err.message });
  }
};

export const validateAdminToken = (req, res, next) => {
  validateToken(req, res, next, "admin");
};

export const validateManagerToken = (req, res, next) => {
  validateToken(req, res, next, "manager");
};

export const validateUserToken = (req, res, next) => {
  validateToken(req, res, next, "user");
};
