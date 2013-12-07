var mysql=require('mysql');
var option=require('./setting');

function User(user){
        this.nickname=user.nickname;
        this.password=user.password;
        this.email=user.email;
}

module.exports=User;

User.prototype.save=function save(callback){
        var user={nickname:this.nickname,email:this.email,password:this.password};
        var client = mysql.createConnection(option);
        client.connect(function(err){
                if (err) {
                        console.log(err);
                        return;
                }
                client.query('insert into user(email,nickname,password) values(?,?,?)',
                        [user.email,user.nickname,user.password],
                        function(err,result){
                                if(err) console.log(err);
                                console.log(result);
                                callback(err,result);
                        }
                        );
        });
}

User.prototype.getUserById=function getById(user_id,callback){
        var client=mysql.createConnection(option);
        client.connect(function(err){
                if(err){
                        console.log(err);
                        return;
                } 
                client.query('select * from user where user_id=?',
                        [user_id],
                        function(err,result){
                                console.log(result);
                                callback(err,result);
                        }
                        );
        });
}

User.prototype.checkUser=function(email,password,callback){
      var client=mysql.createConnection(option);
      client.connect(function(err){
        if(err){
          console.log(err);
          return;
        }
        client.query('select * from user where email=? and password=?',[email,password],function(err,result){
          console.log(result);
          var msg={};
          if(result.length==0){
            msg.code=1;
          }else{
            msg.code=0;
            msg.user=result[0];
          }
          callback(err,JSON.stringify(msg));
        });
      });
};
