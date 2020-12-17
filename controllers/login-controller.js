require("dotenv").config()

const { User } = require("../models/user")

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const _ = require("lodash")

const addHoursToNow = h => {
  var date = new Date()
  date.setTime(+date + h * 3600000)
  return date
}

const userLogin = async (req, res) => {
  try {
    let user_info = await User.findOne({ email: req.body.email })
    if (!user_info) {
      return res.status(400).send("This email is not registered.")
    }
    let user_password = await bcrypt.compare(
      req.body.password,
      user_info.password
    )
    if (!user_password) {
      return res.status(400).send("Wrong password.")
    }

    if (process.env.PRIVATE_KEY == undefined) {
      console.log("Cannot continue without a private key.\nExiting process.")
      process.exit(1)
    }

    const sign_data = {
      user: user_info.name,
      email: user_info.email,
      admin: user_info.admin,
    }

    // In hours.
    const token_expire = 2
    const date_expire = addHoursToNow(token_expire)
    // Send token.
    const token = jwt.sign({ ...sign_data }, process.env.PRIVATE_KEY, {
      expiresIn: `${token_expire}h`,
    })
    const token_cookie = {
      expires: date_expire,
      path: "/",
      sameSite: "None",
      secure: true,
      httpOnly: true,
    }
    res
      .cookie("token", token, token_cookie)
      .status(200)
      .send({ ...sign_data, date_expire: date_expire })
  } catch (err) {
    console.log(err)
    res.status(400).send(`An error has occurred.`)
  }
}

const userLogout = async (req, res) => {
  try {
    res.clearCookie("token").status(200).send()
  } catch (err) {
    console.log(err)
    res.status(400).send(`An error has occurred.`)
  }
}

module.exports = {
  userLogin: userLogin,
  userLogout: userLogout,
}
