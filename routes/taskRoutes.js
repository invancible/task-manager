const express = require("express");

const taskController = require("../controllers/taskController");

const router = express.Router();

router.get("/create", taskController.getCreateTask);
router.get("/update", taskController.getEditTask);
router.get("/", taskController.getIndex);

module.exports = router;