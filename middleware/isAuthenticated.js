const userModel = require("../model/userModel");

exports.isAuthenticated = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ msg: "No token provided" });
    }

    const user = await userModel.findById(token);

    if (!user) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    req.userId = user._id;
    req.user = user;
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error" });
  }

  next();
};

exports.userRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ msg: "Unauthorized user" });
    }
    next();
  };
};
