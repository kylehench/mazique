const userController = require('../controllers/user.controllers')
const { authenticate } = require('../config/jwt.config')

module.exports = app => {
  app.post("/api/register", userController.register)
  app.post("/api/login", userController.login)
  app.post("/api/logout", userController.logout)

  // this route now has to be authenticated
  app.get("/api/users", authenticate, userController.getAll)
  app.get("/api/users/loggedin", authenticate, userController.getLoggedInUser)
}