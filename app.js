// 以 Express 建立 Web 伺服器
var express = require("express");
var app = express();

// 以 body-parser 模組協助 Express 解析表單與JSON資料
var bodyParser = require('body-parser');
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({extended: false}) );

// Web 伺服器的靜態檔案置於 public 資料夾
app.use( express.static( "public" ) );

// 以 express-session 管理狀態資訊
var session = require('express-session');
app.use(session({
    secret: 'secretKey',
    resave: false,
    saveUninitialized: true
}));

// 指定 esj 為 Express 的畫面處理引擎
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/view');

// 一切就緒，開始接受用戶端連線
app.listen(3000);
console.log("Web伺服器就緒，開始接受用戶端連線.");
console.log("「Ctrl + C」可結束伺服器程式.");

var mysql=require("mysql");
var connection =mysql.createConnection({
    user: "root",
    password:"root",
    host:"localhost",
    port :3306,
    database:"test"
});
connection.connect(function(error){
    if(error){

        console.log(error);
    }else{
        console.log("connect  ok")
    }
});
console.log("done");

app.get("/product",function(req,res){
    connection.query("select*from product",
    [],
    function(err,data){
        res.send(JSON.stringify(data));
    }
   
    
    
    )
})
// app.post("/home/news", function (request, response) {

// 	connection.query(
// 		"insert into news set title = ?, ymd = ? ", 
// 			[
// 				request.body.title, 
// 				request.body.ymd
// 			]);
// 	response.send("row inserted.");
    
// })


// app.put("/home/news", function (request, response) {

// 	connection.query(
// 		"update news set title = ?, ymd = ? where newsId = " 
// 		    + request.body.newsId, 
// 			[
// 				request.body.title, 
// 				request.body.ymd
// 			]);
// 	response.send("row updated.");
    
// })
// app.delete("/home/news", function (request, response) {

// 	connection.query(
// 		"delete from news where newsId = " + request.body.newsId,
// 			[]
// 		);
// 	response.send("row deleted.");
    
// })