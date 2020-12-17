const express = require("express")
const router = express.Router()

const { validateUserLogin } = require("../models/user")
const loginController = require("../controllers/login-controller")
const validateMiddleware = require("../middleware/joi-validator")
const authenticationMiddleware = require("../middleware/authentication")

router.post(
  "/",
  validateMiddleware(validateUserLogin),
  loginController.userLogin
)

router.get("/", authenticationMiddleware(), async (req, res) => {
  res.status(200).send(req.user)
})

router.patch("/", loginController.userLogout)

module.exports = router
