const router = require("express").Router();

const api = require("./api");
const isClient = require("../middleware/isClient");

router.use("/api", isClient, api);

router.use((req, res, next) => {
  res.status(404).json({ success: false, message: "404 Not Found" });
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({ success: false, error: err.message });
});

module.exports = router;
