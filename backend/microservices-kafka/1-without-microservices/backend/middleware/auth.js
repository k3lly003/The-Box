const dummyIsAuthorized = true;
const dummyUserId = "123456";

export const authMiddleware = (req, res, next) => {
  if (!dummyIsAuthorized) {
    return res.status(403).send("Unauthorized");
  }
  req.userId = dummyUserId;
  next();
};