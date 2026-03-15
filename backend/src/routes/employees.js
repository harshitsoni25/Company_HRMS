const express = require("express");
const router = express.Router();
const {
  createEmployee,
  getAllEmployees,
  deleteEmployee,
  updateEmployee,
} = require("../controllers/employeeController");
const { validateEmployee } = require("../middleware/validate");

router.post("/", validateEmployee, createEmployee);
router.get("/", getAllEmployees);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);

module.exports = router;
