var http=require('http');
var ak='A5564517ff860a6270ed20e1b85a2bc4';

var get=function(req,res){
        var root_res=res;

        var longitude=req.query.longitude;
        var latitude=req.query.latitude;
//        longitude=116.322987;
  //      latitude=39.983424;
        var position={
                longitude:longitude,
                latitude:latitude
        };
        var path='/geocoder/v2/?'+'ak='+ak+'&location='+position.latitude+','+position.longitude+'&output=json&pois=1';
        var options={
                host:'api.map.baidu.com',
                path:path,
                method:'GET'
        };


        http.request(options,function(res){
                var data='';
                res.on('data',function(chunk){
                        data+=chunk;
                });
                res.on('end',function(){
                        var location_json=JSON.parse(data);
                        var pois_json={};
                        pois_json.pois=location_json.result.pois;
                        root_res.end(JSON.stringify(pois_json)); 
                });
        }).end();
};

exports.get=get;
