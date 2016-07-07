/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport')

module.exports = {

  login (req, res) {
    passport.authenticate('local', function (err, user, info) {
      if ((err) || (!user)) {
        return res.send(401, {
          message: 'Username or password is wrong!',
          err: err
        });
      }
      req.logIn(user, function (err) {
        if (err) {
          return res.send(401, {
            message: err
          });
        }
        res.redirect('/dashboard')
      });
    })(req, res);
  },

};

