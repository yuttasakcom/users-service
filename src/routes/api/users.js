const router = require("express").Router();

const UserController = require("../../controllers/UserController");

router.get("/", UserController.get);
router.post("/", UserController.create);

module.exports = router;
