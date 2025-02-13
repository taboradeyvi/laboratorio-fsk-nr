import "dotenv/config";
import jsonwebtoken from "jsonwebtoken";

export function generateToken(userName, email, role) {
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
    const data = jsonwebtoken.verify(token, process.env.JWT_SECRET_KEY);
    if (data.role !== "admin") {
      return res.status(403).json({ error: "Forbidden: Admin role required" });
    }
    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized" });
  }
}
