const express = require("express")
const router = express.Router()

const { validateNewPost } = require("../models/post")
const validateMiddleware = require("../middleware/joi-validator")
const postController = require("../controllers/post-controller")
const authenticationMiddleware = require("../middleware/authentication")

router.post(
  "/",
  authenticationMiddleware(),
  validateMiddleware(validateNewPost),
  postController.postAdd
)

router.get("/", postController.postGetAll)

module.exports = router
