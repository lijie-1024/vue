const express = require("express");
const app = express();
var cors = require("cors");

var querystring = require("querystring");

app.use(cors());
app.use(function(req, res, next) {
  var str = "";
  req.on("data", chunk => {
    str += chunk;
  });
  req.on("end", () => {
    req.body = str;
    next();
  });
});

var arr = [
  { id: 1, name: "宝马", ctime: new Date() },
  { id: 2, name: "奔驰", ctime: new Date() },
  { id: 3, name: "路虎", ctime: new Date() },
  { id: 4, name: "玛莎拉蒂", ctime: new Date() },
  { id: 5, name: "拉博季尼", ctime: new Date() },
  { id: 6, name: "比亚迪", ctime: new Date() }
];

app.get("/api/getprodlist", (req, res) => {
  res.send({ status: 0, message: arr });
});

app.post("/api/addproduct", (req, res) => {
  // arr.push(JSON.parse(req.body))
  var item = JSON.parse(req.body);
  item.ctime = new Date();
  arr.push(item);
  res.send({ status: 200, msg: "ok" });
});

app.get("/api/addlist/:id", (req, res) => {
  var id = req.params.id;
  var index;
  arr.forEach(function(item, i) {
    if (item.id == req.params.id) {
      index = i;
    }
  });
  var newarr = arr.splice(index, 1);
  res.send({ status: 0, message: newarr });
});

app.get("/");

app.listen(3000, "127.0.0.1");
