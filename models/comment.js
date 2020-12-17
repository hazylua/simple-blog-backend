const Joi = require("joi")
const mongoose = require("mongoose")

const collection_name = "comments"

const commentSchema = new mongoose.Schema(
  {
    author: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    body: {
      type: String,
      required: true,
    },
  },
  { collection: collection_name }
)

const Comment = mongoose.model("Comment", commentSchema)

const joi_author_msgs = {
  "any.required": `A name needs to be provided.`,
  "string.base": `The name should be of type "text".`,
  "string.empty": `The name should not be empty.`,
}

const joi_date_msgs = {
  "any.required": `A date needs to be provided.`,
  "date.base": `The date should be a valid "date" type.`,
  "date.empty": `The date should not be empty.`,
}

const joi_body_msgs = {
  "any.required": `A comment needs to be provided.`,
  "array.base": `The body of this comment is not valid".`,
  "array.empty": `The comment should not be empty.`,
}

const validateComment = body => {
  const schema = Joi.object({
    author: Joi.string().required().messages(joi_author_msgs),
    date: Joi.date().required().messages(joi_date_msgs),
    body: Joi.string().required().messages(joi_body_msgs),
  })
  return schema.validate(body)
}

exports.commentSchema = commentSchema
exports.Comment = Comment
exports.validateComment = validateComment
