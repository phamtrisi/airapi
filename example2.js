var m = require('./models');

var h1 = new m.Hosting(1093088);

h1.getInfo(function success(info) {
  console.log(info);
});