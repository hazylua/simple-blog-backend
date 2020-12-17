const { array } = require("joi")
const Joi = require("joi")
const mongoose = require("mongoose")

const { commentSchema } = require("../models/comment")

const collection_name = "blog_posts"

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    author: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    body: {
      type: [Object],
      required: true,
    },
    comments: { type: [commentSchema] },
    hidden: Boolean,
  },
  { collection: collection_name }
)

const Post = mongoose.model("Blog", postSchema)

const joi_title_msgs = {
  "any.required": `A post title needs to be provided.`,
  "string.base": `The post title should be of type "text".`,
  "string.empty": `The post title should not be empty.`,
}

const joi_author_msgs = {
  "any.required": `A post author needs to be provided.`,
  "string.base": `The post author should be of type "text".`,
  "string.empty": `The post author should not be empty.`,
}

const joi_date_msgs = {
  "any.required": `A post date needs to be provided.`,
  "date.base": `The post date should be a valid "date" type.`,
  "date.empty": `The post date should not be empty.`,
}

const joi_body_msgs = {
  "any.required": `A post body needs to be provided.`,
  "array.base": `The body of this post is not valid.`,
  "array.empty": `The post body should not be empty.`,
}

const validateNewPost = body => {
  const schema = Joi.object({
    title: Joi.string().required().messages(joi_title_msgs),
    author: Joi.string().required().messages(joi_author_msgs),
    date: Joi.date().required().messages(joi_date_msgs),
    body: Joi.array().required().messages(joi_body_msgs),
  })
  return schema.validate(body)
}

exports.Post = Post
exports.validateNewPost = validateNewPost
