const { Post } = require("../models/post")
const { Comment } = require("../models/comment")
const _ = require("lodash")

const postAdd = async (req, res) => {
  try {
    let title = await Post.findOne({ title: req.body.title })
    if (title) {
      return res
        .status(400)
        .send("Post title already exists. Please choose another title.")
    } else {
      const post_info = _.pick(req.body, ["title", "author", "date", "body"])
      var post = new Post(post_info)
      await post.save()
      res.send(_.pick(post, ["_id", "title", "date"]))
    }
  } catch (err) {
    console.log(err)
    res.status(400).send(`An error has occurred.`)
  }
}

const commentAdd = async (req, res) => {
  try {
    let post = await Post.findOne({ title: req.body.title })
    if (!post) {
      return res
        .status(400)
        .send(
          "This does not exist.\nEither it's been marked for removal or an error has occurred."
        )
    } else {
      const comment_body = _.pick(req.body, ["author", "date", "body"])
      var comment = new Comment(comment_body)
      post.comments.push(comment)
      post.save()
      return res.status(200).send()
    }
  } catch (err) {
    console.log(err)
    return res
      .status(400)
      .send(
        "This does not exist.\nEither it's been marked for removal or an error has occurred."
      )
  }
}

const postGetAll = async (req, res) => {
  const posts = await Post.find({})
  res.send(posts)
}

module.exports = {
  postAdd: postAdd,
  postGetAll: postGetAll,
  commentAdd: commentAdd,
}
