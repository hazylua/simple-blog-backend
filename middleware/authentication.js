const jwt = require("jsonwebtoken")

const no_auth = `No authentication.`
const bad_header = `Bad header.`
const bad_token = `Bad token.`

function getCookieValue(a, c) {
  var b = c.match("(^|;)\\s*" + a + "\\s*=\\s*([^;]+)")
  return b ? b.pop() : ""
}

module.exports = () => {
  return (req, res, next) => {
    if (req.headers.cookie) {
      const token = getCookieValue("token", req.headers.cookie)
      if (token) {
        jwt.verify(token, process.env.PRIVATE_KEY, (err, decoded) => {
          if (err) {
            return res.status(401).send(bad_token)
          }
          req.user = decoded
          next()
        })
      } else {
        return res.status(401).send(bad_token)
      }
    } else {
      return res.status(401).send(no_auth)
    }

    // if (!req.headers["authorization"]) {
    //   return res.status(401).send(no_auth)
    // }
    // const auth_header = req.headers["authorization"].split(" ")
    // if (auth_header.indexOf("Bearer") != 0) {
    //   return res.status(401).send(bad_header)
    // }
    // const token = auth_header[1]
    // jwt.verify(token, process.env.PRIVATE_KEY, (err, decoded) => {
    //   if (err) {
    //     return res.status(401).send(bad_token)
    //   }
    //   //   console.log(decoded)
    //   req.user = decoded
    //   next()
    // })
    // if (!jwt.verify(token, process.env.PRIVATE_KEY)) {
    //   return res.status(401).send(bad_token)
    // }
    // next()
  }
}
