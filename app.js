var express=require('express');
var userController=require('./userController');
var roomController=require('./roomController');
var messageController=require('./messageController')
var app=new express();

app.configure(function(){
        app.use(express.bodyParser());
        app.use(express.static(__dirname+'/public'));
});

           app.all('/*',function(req,res,next){
           res.setHeader("Content-Type", "application/json; charset=utf-8");
           next();
           });

           app.get('/user',function(req,res){
           userController.get(req,res);
           });

           app.post('/user',function(req,res){
           userController.add(req,res);
           });
           app.post('/userlogin',function(req,res){
           userController.login(req,res);
           });

           app.get('/message',function(req,res){
           messageController.get(req,res);
           });

           app.post('/message',function(req,res){
           messageController.add(req,res); 
           });

           app.get('/room',function(req,res){
           roomController.get(req,res); 
           });

           app.listen(3000);
console.log('start');
