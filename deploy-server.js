var exspress = require("express");

var app = exspress();

app.use("/node_modules",
  exspress.static("/usr/src/sportsstore/node_modules"));
app.use("/", exspress.static("/usr/src/sportsstore/app"));

app.listen(3000, function () {
  console.log("HTTP Server running on port 3000");
});
