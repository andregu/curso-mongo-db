var MongoClient = require('mongodb').MongoClient;

	MongoClient.connect('mongodb://localhost:27017/weather', function(err, db) {
    if(err) throw err;

	var temps =db.collection('data');
    var query = {};

    temps.find(query).sort({ 'State': 1, 'Temperature': -1 }).toArray(function(err, docs) {
		for(var i=0;i<docs.length;i++)
        {
            if(i==0)
            {
                docs[i].month_high = true;
                temps.save(docs[i],{safe:true},function(err){

                });
            }
            else if(i==docs.length-1)
            {

            }
            else
            {
                if(docs[i].State != docs[i-1].State)
                {
                    docs[i].month_high = true;
                    temps.save(docs[i],{safe:true},function(err){

                    });
                }
            }

        }
		var fs = require('fs');
		fs.writeFileSync('2.txt', JSON.stringify(docs,null,4));
		console.log("file done");
        db.close();
    });
});