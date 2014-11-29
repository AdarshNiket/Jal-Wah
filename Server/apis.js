/**
 * File Name: apis.js,
 * Author: Clarice Technologies,
 * Date Created: 29th Nov 2014,
 * Description: This is simply enables apis.
 */
var apisMap = require('./apisMap.js').apis;

module.exports = function(app){
  //Error Handler
  app.error(function(error, request, response, next) {
    console.log('App Error : ' + error);
    response.end('Please try again later');
  });
  
  apisMap.forEach(function(menu,key){
    if(menu){
    var file = menu.file;
    var fn = menu.callback;
      menu.methods.split(',').forEach(function(method){
        app[method](menu.url,function(request,response,next){
          require(file)[fn](request,response,next);
        });
      });
    }
  });

};