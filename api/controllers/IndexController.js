/**
 * IndexController
 *
 * @description :: Server-side logic for managing indices
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  index (req, res) {
    if (req.user)
      return res.redirect('/dashboard')
    res.ok('login')
  }
}

