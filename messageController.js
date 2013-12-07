var Message=require('./messageDao'); 

var add=function(req,res){
  var user_id=req.body.user_id;
  var pois_id=req.body.pois_id;
  var content=req.body.content;
  var newMsg=new Message({user_id:user_id,pois_id:pois_id,content:content});
  newMsg.save(function(err,result){
    res.end(JSON.stringify(result));
  });
  
};

var get=function(req,res){
  var message_id=req.query.message_id;
  var pois_id=req.query.pois_id;
  var newMsg=new Message({});
  newMsg.getMessagesAfterId(message_id,pois_id,function(err,result){
    res.end(JSON.stringify(result));
  });
};

exports.add=add;
exports.get=get;
