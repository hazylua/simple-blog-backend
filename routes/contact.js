const express = require("express")
const router = express.Router()

const { validateForm } = require("../models/contact")
const contactController = require("../controllers/contact-controller")
const validateMiddleware = require("../middleware/joi-validator")

router.post(
  "/",
  validateMiddleware(validateForm),
  contactController.contactSubmit
)

module.exports = router
