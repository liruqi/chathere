var User=require('./userDao');

var add=function(req,res){
        var nickname=req.body['nickname'];
        var email=req.body['email'];
        var password=req.body['password'];

        var newUser=new User({nickname:nickname,email:email,password:password});
        newUser.save(function(err,result){
                if(err) res.end(JSON.stringify(err));
                res.write(JSON.stringify(result));
                res.end();
        });
};

var get=function(req,res){
        var user_id=req.query.id;
        var newUser=new User({});
        newUser.getUserById(user_id,
                        function(err,result){
                                res.write(JSON.stringify(result));
                                res.end();
                        });
};

var login=function(req,res){
  var email=req.body.email;
  var password=req.body.password;
  var newUser=new User({});
  newUser.checkUser(email,password,function(err,result){
    res.write(result);
    res.end();
  });
};
exports.get=get;
exports.add=add;
exports.login=login;
