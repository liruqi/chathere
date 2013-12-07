if (process.env.BAE_ENV_AK) {
    var username = process.env.BAE_ENV_AK;
    var password = process.env.BAE_ENV_SK;
    var db_host = process.env.BAE_ENV_ADDR_SQL_IP;
    var db_port = process.env.BAE_ENV_ADDR_SQL_PORT;
    var db_name = 'TrQJCVxKzyhqiUiGByzN';   //该数据库名为用户在bae平台创建的数据库名称
} else {
    var username = 'root';
    var password = '123456';
    var db_host = 'localhost';
    var db_port = '3306';
    var db_name = 'chatroom';
}

var option = {
host: db_host,
      port: db_port,
      user: username,
      password: password,
      database: db_name
}
var os = require("os");
if (os.networkInterfaces().eth0 && os.networkInterfaces().eth0[0].address == '106.186.23.182') {
    option.password = 'admin';
    option.socketPath = '/var/run/mysqld/mysqld.sock';
}
module.exports=option;

if (require.main === module) {
    console.log(module.exports)
    console.log(os.networkInterfaces().eth0[0])
}
