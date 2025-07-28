import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const autheader = req.headers.authorization;
  if (!autheader || !autheader.startsWith("Bearer ")) {
    return res.status(401).send({ message: "Unauthorized" });
  }
  const token = autheader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(403)
        .send({ message: "Forbidden token failed to verify" });
    }
    req.user = decoded;
    next();
  });
};

export default auth;

