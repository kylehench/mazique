const jwt = require("jsonwebtoken")

// const secret = "I can't believe this key is so secret!"
// module.exports.secret = secret

// authenticate will authentic users in the server by looking at cookies
module.exports.authenticate = (req, res, next) => {
  jwt.verify(req.cookies.usertoken, process.env.SECRET_KEY, (err, payload) => {
    if (err) { 
      res.status(401).json({verified: false})
    } else {
      next()
    }
  })
}