const express = require("express")
const router = express.Router()

const { validateComment } = require("../models/comment")
const validateMiddleware = require("../middleware/joi-validator")
const postController = require("../controllers/post-controller")
const authenticationMiddleware = require("../middleware/authentication")

router.post(
  "/",
  authenticationMiddleware(),
  validateMiddleware(validateComment),
  postController.commentAdd
)

router.get("/", postController.postGetAll)

module.exports = router
