var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');

//requirement is done

var app = express();

/*
var logger = function(req,res,next){
	console.log("Logging ....");
	next();
}

app.use(logger);

*/

//bodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//set static path

app.use(express.static(path.join(__dirname ,'public')));

//global vars
app.use(function(req,res,next){
	res.locals.errors = null;
	next();
});
//Express validator

app.use(expressValidator({
	errorFormatter:function(param,msg,value){
		var namespace = param.split('.')
		,root = namespace.shift()
		,formParam = root;

		while(namespace.length){
			formParam += '['+namespace.shift() + ']';
		}
		return{
			param:formParam,
			msg:msg,
			value:value
		};
	}
}));




//view engine

app.set('view engine','ejs');
app.set('views' ,path.join(__dirname, 'views'));

var users = [
		
		{
			id:1,
			first_name :"rushdi",
			last_name:"sing",
			email:'rsing@gmail.com',
		},
		{
			id:2,
			first_name :"wahid",
			last_name:"sing",
			email:'wsing@gmail.com',
		},
		{
			id:3,
			first_name :"vikram",
			last_name:"sing",
			email:'vsing@gmail.com'
		}



]

//routes
app.get('/', function(req,res){
	
	res.render('index',{
		title:'customers',
		users:users
	});
});

app.post('/users/add',function(req,res){

	req.checkBody('first_name','First name is required').notEmpty();
	req.checkBody('last_name','Last name is required').notEmpty();
	req.checkBody('email','email is required').notEmpty();

	var errors = req.validationErrors();

	if(errors){
		console.log("Errors");
			res.render('index',{
			title:'customers',
			users:users,
			errors:errors
		});
	}else{
		var newUser = {
			first_name:req.body.first_name,
			last_name:req.body.last_name,
			email:req.body.email
		}
		console.log('SUCCESS');
	}

	
	
});
app.listen(3000,function(){
	console.log("server started on port 3000");
});