/**
 * File Name: apis.js,
 * Author: Clarice Technologies,
 * Date Created: 29th Nov 2014,
 * Description: This is simply map apis with API urls.
 */
exports.apis = [
{
  "url" : "/checkUser/?:emailId",
  "callback" : "checkUserHandler",
  "methods" : "get",
  "file" : "./modules/user.js"
},
{
  "url" : "/createUser",
  "callback" : "checkUserHandler",
  "methods" : "post",
  "file" : "./modules/user.js"
}, 
{
  "url" : "/usageMetrics",
  "callback" : "usageMetricsHandler",
  "methods" : "get",
  "file" : "./modules/metrics.js"
}/*,
{
   "url" : "/books",
   "callback" : "showBooks",
   "methods" : "get",
   "file" : "./books.js"
},
{
   "url" : "/addbooks",
   "callback" : "addBookHandler",
   "methods" : "get,post",
   "file" : "./addbooks.js"
}*/
];