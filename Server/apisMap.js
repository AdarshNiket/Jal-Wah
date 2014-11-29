exports.apis = [
{
  "url" : "/checkUser/?:emailId",
  "callback" : "checkUserHandler",
  "methods" : "get",
  "file" : "./modules/user.js"
}/*, 
{
  "url" : "/adminlogin",
  "callback" : "loginHandler",
  "methods" : "get,post",
  "file" : "./login.js"
},
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