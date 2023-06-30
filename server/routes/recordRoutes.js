const Router = require("express");
const router = new Router();
const recordController = require("../controllers/recordController");

router.post("/", recordController.create);
router.get("/", recordController.getAll);
router.get("/:id", recordController.getOne);

module.exports = router;
