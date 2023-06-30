const Router = require("express");
const router = new Router();
const groupController = require("../controllers/groupController");
const checkRole = require("../middleware/checkRoleMIddleware");

router.post("/", groupController.create);
router.get("/", groupController.getAll);

module.exports = router;
