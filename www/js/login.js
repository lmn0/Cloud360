var _mysql = require('mysql');
var exp = require('express');
var app = exp();
var HOST = 'mydbinstance.csyqkelzavlg.us-west-1.rds.amazonaws.com';
var MYSQL_USER = 'cmpe272';
var MYSQL_PASS = 'test1234';
var DATABASE = 'mysqldb';
var PORT = 3306;
var CryptoJS = require('crypto-js');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");

  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.get('/login?',function(req,res){
var mysql = _mysql.createConnection({
    user: MYSQL_USER,
    password: MYSQL_PASS,
    host : HOST,
    database: DATABASE,
    port : PORT
});

var connection = mysql.connect();
var decrypt = CryptoJS.AES.decrypt(req.query.password,'ertf#$$DDT@%^YJGFrer3548=-?><67f56uj+u789[]tjs');
console.log(req.query.username);
console.log(req.query.password);
decrypt=(decrypt.toString(CryptoJS.enc.Utf8))
var en=CryptoJS.AES.encrypt(decrypt,"air@#%fgv3q4kj&%$#$^4356@#$%&><?%4356");
en;


//en = en.toString(CryptoJS.enc.Utf8);
console.log(&en);
mysql.query("select * from account where username='"+req.query.username+"' and password='"+req.query.password+"'", function(err, rows, fields) {
  if(!err)
{
        if(rows[0]!=null)
        console.log(rows);
        if(rows[0]!=null)
           res.send("login");
        else
           res.send("denied");
}
  else
{
console.log("denied");
        res.send("denied");
}
});
mysql.end();
});


app.get('/search?',function(req,res,next){
console.log("hey");
var mysql = _mysql.createConnection({
    user: MYSQL_USER,
    password: MYSQL_PASS,
    host : HOST,
    database: DATABASE,
    port : PORT
});
console.log("hi");

var connection = mysql.connect();
console.log("hell");

var d=new Date();
var lastlogin=d.getTime();
console.log(req.query.value);

var decrypt = CryptoJS.AES.decrypt(req.query.value,'ertf#$$DDT@%^YJGFrer3548=-?><67f56uj+u789[]tjs');
console.log(decrypt.toString(CryptoJS.enc.Utf8));
var en = CryptoJS.AES.encrypt(decrypt.toString(CryptoJS.enc.Utf8),"air@#%fgv3q4kj&%$#$^4356@#$%&><?%4356");
//en=(en.toString(CryptoJS.enc.Utf8));
mysql.query("insert into account(username,password,email,lastlogin) values ('"+req.query.username+"','"+en+"','"+req.query.email+"',"+lastlogin+")"
,function(err,result){
if(err!=null)
{
res.send("Error");
}
else
{
res.send("Done");
}
}
);

mysql.end();
//res.send("Done");
});


app.listen(9111);
