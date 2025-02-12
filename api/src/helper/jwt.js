import "dotenv/config";
import jsonwebtoken from "jsonwebtoken";

export function generateToken({ userName, email, role }) {
  return jsonwebtoken.sign(
    { userName, email, role },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "8h",
    }
  );
}

export function checkToken(req, res, next) {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    jsonwebtoken.verify(token, process.env.JWT_SECRET_KEY);
    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized" });
  }
}
