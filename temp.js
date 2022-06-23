
const express = require('express');
const app = express();
const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'cdac',
    database: 'patil',
	port:3306
	
});

const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');
const { query } = require('express');

app.use(express.static('abc'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
//whether you want nested objects support  or not
app.get('/getdetails', (req,res)=>{
	connection.query('select * from book where bookid=?', [req.query.bookid],(err,res1)=>{
		if(err){
			console.log("Something wrong");
		}else{
			if(res1.length >0){
				res.send(res1[0]);
			}else{
				res.send(true);
			}
		}
	});
});


app.get('/update', (req,res)=>{
	connection.query('update book set bookname=?, price=? where bookid=?',[req.query.bookname, req.query.bookprice, req.query.bookid,],(err,res1)=>{
		if(err){
			console.log("Error occure in update query");
		}else{
			if(res1.affectedRows == 0){
				res.send(false);
			}else{
				res.send(true);
			}
		}
	});
});





app.listen(8081, function () {
    console.log("server listening at port 8081...");
});