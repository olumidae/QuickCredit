'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _users = require('../dummies/users');

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserData = function () {
  function UserData() {
    _classCallCheck(this, UserData);

    this.UserData = [];
  }

  _createClass(UserData, [{
    key: 'signUp',
    value: function signUp(info) {
      var newUser = {
        id: this.UserData.length + 1,
        firstName: info.firstName,
        lastName: info.lastName,
        email: info.email,
        password: _bcrypt2.default.hashSync(info.password, 5),
        address: info.address,
        status: 'unverified',
        isAdmin: info.isAdmin,
        isLoggedIn: 'false'
      };
      this.UserData.push(newUser);
      return newUser;
    }
  }]);

  return UserData;
}();

exports.default = new UserData();