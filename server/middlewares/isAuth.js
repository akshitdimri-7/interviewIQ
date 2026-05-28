import jwt, { verify } from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  try {
    let { token } = req.cookies;

    if (!token) {
      return res.status(400).json({ message: "User doesn't have a token." });
    }

    const verifyToken = jwt.verfy(token, process.env.JWT_SECRET);

    if (!verifyToken) {
      return res
        .status(400)
        .json({ message: "User doesn't have a valid token." });
    }

    req.userId = verify.userId;

    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error during token verification ${error}` });
  }
};

export default isAuth;
