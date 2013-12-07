var mysql=require('mysql');
var option=require('./setting');

function Message(message){
        this.message_id=message.message_id;
        this.user_id=message.user_id;
        this.pois_id=message.pois_id;
        this.send_time=message.send_time;
        this.content=message.content;
}

module.exports=Message;

Message.prototype.save=function(callback){
        var message={message_id:this.message_id,user_id:this.user_id,pois_id:this.pois_id,send_time:this.send_time,content:this.content};
        var client = mysql.createConnection(option);
        client.connect(function(err){
                if (err) {
                        console.log(err);
                        return;
                }
                client.query('insert into message(user_id,pois_id,content) values(?,?,?)',
                        [message.user_id,message.pois_id,message.content],
                        function(err,result){
                                if(err) console.log(err);
                                console.log(result);
                                callback(err,result);
                        }
                        );
        });
};

Message.prototype.getMessagesAfterId=function(message_id,pois_id,callback){
        var client=mysql.createConnection(option);
        client.connect(function(err){
                if(err){
                        console.log(err);
                        return;
                } 
                client.query('select * from message where message_id>? and pois_id=?',
                        [message_id,pois_id],
                        function(err,result){
                                console.log(result);
                                callback(err,result);
                        }
                        );
        });
};

