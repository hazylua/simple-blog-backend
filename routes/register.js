const express = require("express")
const router = express.Router()

const { validateUserRegister } = require("../models/user")
const registerController = require("../controllers/register-controller")
const validateMiddleware = require("../middleware/joi-validator")

router.post(
  "/",
  validateMiddleware(validateUserRegister),
  registerController.registerUser
)

module.exports = router
