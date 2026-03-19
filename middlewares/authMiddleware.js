import JWT from 'jsonwebtoken';

// Protect Route Middleware
export const requireSignIn = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).send({
        success: false,
        message: "No token provided"
      });
    }

    // Verify token
    const decoded = JWT.verify(token, process.env.JWT_SECRET);

    // Attach user data
    req.user = decoded;

    next();
  } catch (error) {
    console.log(error);

    return res.status(401).send({
      success: false,
      message: "Invalid or Expired Token",
      error: error.message
    });
  }
};