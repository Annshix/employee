/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var bcrypt = require('bcrypt')

module.exports = {

  attributes: {
    email: {
      type: 'email',
      unique: true,
      required: true
    },
    password: {
      type: 'string',
      required: true
    },
    type: {
      type: 'string',
      enum: ['admin', 'user'],
      required: true
    },
    name: {
      type: 'string',
    },
    phone: {
      type: 'string',
      isMobile: true,
      // required: true
    },
    address: {
      type: 'string',
      // required: true
    },
    department1: {
    },
    department2: {
    },
    positionName: {
      type: 'string',
      // required: true
    },
    positionLevel: {
      type: 'string',
      // required: true
    },
    boss: {
      type: 'string',
      // model: 'user'
    },
    subs: {
      collection: 'user',
      via: 'boss'
    },
    inDate: {
      type: 'date',
      // required: true
    },
    relativeName: {
      type: 'string',
      // required: true
    },
    relativePhone: {
      type: 'string',
      isMobile: true,
      // required: true
    },
    toJSON: function () {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }
  },

  types: {
    isMobile: function(value){
      var mobile = /^1((3|5|8){1}\d{1}|70)\d{8}$/
      return mobile.test(value)
    }
  },

  beforeCreate: function (user, cb) {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) {
          console.log(err)
          cb(err)
        } else {
          user.password = hash
          cb(null, user)
        }
      });
    });
  }
};

