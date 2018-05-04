module.exports = (req, res, next) => {
  const isClient = true;
  if (!isClient) {
    next({ status: 401, message: "401 Unauthorized" });
    return;
  }

  next();
};
