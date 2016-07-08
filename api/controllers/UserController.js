/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport')
var co = require('co')

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

  // add (req, res) {
  //   co(function*() {
  //     var user = yield User.create({
  //       email: req.param('email'), password: req.param('password'), type: req.param('type'),
  //       name: req.param('name'), phone: req.param('phone'), relativeName: req.param('relativeName'),
  //       relativePhone: req.param('relativePhone')
  //
  //     })
  //   }).catch(function (err) {
  //     res.negotiate(err)
  //   })
  // },

  me (req, res) {
    co(function*() {
      var user = yield User.findOne({id: req.user.id})
      res.ok({user: user}, 'user/me')
    }).catch(function (err) {
      res.negotiate(err)
    })
  },

  detail (req, res) {
    co(function*() {
      var user = yield User.findOne({id: req.param('id')})
      res.ok({user: user}, 'user/detail')
    }).catch(function (err) {
      res.negotiate(err)
    })
  },
  
  edit (req, res) {
    co(function*() {
      var user = yield User.findOne({id: req.param('id')})
      res.ok({user: user}, 'user/edit')
    }).catch(function (err) {
      res.negotiate(err)
    })
  },

  list (req, res) {
    var findQuery = {};
    if (req.query.name) findQuery.name = {'contains': req.query.name};
    co(function*() {
      var result = yield User.pagify('data', {
        findQuery: findQuery,
        sort: ['name ASC'],
        page: req.query.page ? parseInt(req.query.page) : 1
      })
      res.ok({data: result.data, meta: result.meta, searchValue: req.query.name}, 'user/list')
    }).catch(function (err) {
      res.negotiate(err)
    })
  },

  dashboard (req, res) {
    co(function*() {
      var users = yield User.find({}).limit(5).sort('createdAt DESC');
      res.ok({users: users}, 'dashboard')
    }).catch(function (err) {
      res.negotiate(err)
    })
  }
};

