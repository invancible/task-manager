const express = require("express");

const taskController = require("../controllers/taskController");
const isAuth = require("../middleware/isAuth");

const router = express.Router();

router.get("/create", isAuth, taskController.getCreateTask);
router.get("/update", isAuth, taskController.getEditTask);
router.get("/", taskController.getIndex);

module.exports = router;