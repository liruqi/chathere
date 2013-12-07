var username = process.env.BAE_ENV_AK;
var password = process.env.BAE_ENV_SK;
var db_host = process.env.BAE_ENV_ADDR_SQL_IP;
var db_port = process.env.BAE_ENV_ADDR_SQL_PORT;
var db_name = 'TrQJCVxKzyhqiUiGByzN';   //该数据库名为用户在bae平台创建的数据库名称

username = 'root';
password = '123456';
db_host = 'localhost';
db_port = '3306';
db_name = 'chatroom';

var option = {
  host: db_host,
  port: db_port,
  user: username,
  password: password,
  database: db_name
}

module.exports=option;
