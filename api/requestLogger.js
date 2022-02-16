var moment = require("moment");
var db = require("./db");

const requestLogger = (req, res, next) => {
  var mysqlTimestamp = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
  let fullRequest = req.protocol + "://" + req.get("host") + req.originalUrl;
  let user = -1;
  //if (req.session.user?.id) {user = req.session.user.id }
  db.createLog(user, mysqlTimestamp, fullRequest);
  next();
};
module.exports = requestLogger;
