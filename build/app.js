"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

let _express = _interopRequireDefault(require("express"));

let _bodyParser = _interopRequireDefault(require("body-parser"));

let _index = _interopRequireDefault(require("./server/routes/index"));

let _users = _interopRequireDefault(require("./server/routes/users"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

let app = (0, _express.default)();
app.use(
  _bodyParser.default.urlencoded({
    extended: true
  })
);
app.use(_bodyParser.default.json()); // endpoints

app.use(_users.default); // Routes

app.use("/", (req, res) => {
  res.send({
    message: "Welcome to the homepage"
  });
});
app.use("/", _index.default);
app.use("/", _users.default); // app.use('/api/v1/signin', users);

let PORT = process.env.PORT || 5000;
app.listen(PORT, console.log("Server Running on ".concat(PORT, "!!!")));
let _default = app;
exports.default = _default;
