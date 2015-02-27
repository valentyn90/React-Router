// var context = require.context('./modules', true, /-test\.js$/);
var context = require.context('./modules/history', true, /-test\.js$/);
context.keys().forEach(context);
