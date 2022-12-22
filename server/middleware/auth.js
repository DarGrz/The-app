import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.TOKEN, (err, data) => {
    if (err) {
      return res.sendStatus(403);
    }

    req.user = data;
    next();
  });
};
