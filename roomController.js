var https=require('https');
var http=require('http');

// https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&types=food&sensor=false&key=AIzaSyAdoegQZ_IbTtTxLkkhJPOxG9vdcR10ZQs

//                            /maps/api/place/nearbysearch/json?location=116.39564504,39.92998578&radius=500&sensor=false&key=AIzaSyAdoegQZ_IbTtTxLkkhJPOxG9vdcR10ZQs
var getGooglePlace  = function(latitude, longitude, res) {
    var path='/maps/api/place/nearbysearch/json?location='+latitude+','+longitude+'&radius=500&sensor=false&key=AIzaSyAdoegQZ_IbTtTxLkkhJPOxG9vdcR10ZQs';
    var options={
host:'maps.googleapis.com',
     path:path,
     method:'GET'
    };
    console.log("Map API:" + path)
    https.request(options,function(response){
            var data='';
            response.on('data',function(chunk){
                data+=chunk;
                });
            response.on('end',function(){
                var location_json=JSON.parse(data);
                var pois_json={};
                pois_json.pois=location_json.results;
    console.log("Map API:" + JSON.stringify(pois_json));
                res.end(JSON.stringify(pois_json)); 
                });
            }).end(); 
}

var get=function(req,res){
        if (req.query.longitude) {
            var longitude=req.query.longitude;
            var latitude=req.query.latitude;
            getGooglePlace(latitude, longitude, res);
        } else {
            var ak='A5564517ff860a6270ed20e1b85a2bc4';
            var path='/location/ip?'+'ak='+ak+'&ip='+req.connection.remoteAddress+'&coor=bd09ll&output=json';
            var options = {
                host: "api.map.baidu.com",
                path: path,
                method: 'GET'
            };
            console.log("Baidu API PATH:" + path);
            http.request(options,function(response){
                var data='';
                response.on('data',function(chunk){
                    data+=chunk;
                });
                response.on('end',function(){
                    console.log("Baidu API:" + data);
                    var loc=JSON.parse(data);
                    if (loc.status == 0) {
                        getGooglePlace(loc.content.point.y, loc.content.point.x, res);
                    } else {
                        res.end(JSON.stringify({code: 1, message: "Cannot locate user", pois: []}));
                    } 
                });
            }).end();
        }

};

exports.get=get;
