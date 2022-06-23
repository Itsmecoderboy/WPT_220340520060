
const express = require('express');
const app = express();
// const cors = require('cors');
// app.use(cors());
// const bodyParser = require('body-parser');

app.use(express.static('abc'));
// app.use(bodyParser.json()); // support json encoded bodies
// app.use(bodyParser.urlencoded({ extended: true }));
//whether you want nested objects support  or not

		//DATABASE CONNECTIVITY
let dbconnect = {
	host: 'localhost',
	user: 'nitin',
	password: 'nitin1998',
	database: 'intel',
	port: 3306
};
const mysql = require('mysql2');
const con = mysql.createConnection(dbconnect);
console.log('Database connection established');

 //Get method to check weather BOOK ID IS PRESENT OR NOT 
app.get('/checkBookId', (req, resp) => {
	console.log("inside /checkBookId ");
	console.log(req.query);
	let input = req.query.x;
	console.log(input);

	let output = { status: false, bookDetails: { bookid: 0, bookname: '', price: 0 } };

	con.query('select * from book where bookid=?', [input],
		(err, rows) => {
			console.log(rows);
			if (err) {
				console.log("Error in fetching rows form database");
			} else {
				if (rows.length > 0) {
					output.status = true;
					output.bookDetails = rows[0];
				}
			}
			resp.send(output);
		});
});

		//Get method to ADD A NEW BOOK to a list
app.get('/addBook', (req, resp) => {
	console.log("inside /addBook ");
	console.log(req.query);
	let input = { bookid: req.query.x, bookname: req.query.y, price: req.query.z };
	console.log(input);

	let output = { status: false };

	con.query('insert into book(bookid, bookname, price) values(?,?,?)',
		[input.bookid, input.bookname, input.price],
		(err, rows) => {
			console.log(rows);
			if (err) {
				console.log("Error in fetching rows form database");
			} else {
				if (rows.affectedRows > 0) {
					output.status = true;
				}
			}
			resp.send(output);
		});
});


		//Get method to SHOW ALL BOOKS of a list
app.get('/ShowAllBooks', (req, resp) => {
	console.log("inside /ShowAllBooks");
	console.log(req.query);

	let output = { status: false };

	con.query('select * from book', [],  
		(err, rows) => {
			console.log(rows);
			if (err) {
				console.log("Error in fetching rows form database");
			} else {
				if (rows.affectedRows > 0) {
					output.status = true;
				}
			}
			resp.send(rows);
		});
});


app.listen(8081, function () {
	console.log("server listening at port 8081...");
});