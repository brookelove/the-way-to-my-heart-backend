const router = require("express").Router();
const userRoutes = require("./userRoutes");
const recipieRoutes = require("./recipieRoutes");

router.use("/user", userRoutes);
router.use("/recipies", recipieRoutes);
