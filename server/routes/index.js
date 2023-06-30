const Router = require("express");
const router = new Router();
const groupRouter = require("./groupRoutes");
const recordRouter = require("./recordRoutes");
const userRouter = require("./userRoutes");

router.use("/user", userRouter);
router.use("/record", recordRouter);
router.use("/group", groupRouter);

module.exports = router;
