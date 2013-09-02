var MongoClient = require('mongodb').MongoClient;

	MongoClient.connect('mongodb://localhost:27017/school', function(err, db) {
    if(err) throw err;

	var students =db.collection('students');
    var query = {};

    students.find(query).toArray(function(err, docs) {
		for(var i=0;i<docs.length;i++)
        {
            if(docs[i].scores[3].score>docs[i].scores[2].score)
            {
                var scores = [];
                scores[0]=docs[i].scores[0];
                scores[1]=docs[i].scores[1];
                scores[2]=docs[i].scores[3];
                docs[i].scores = scores;
                students.save(docs[i],{safe:true},function(err){

                });
            }
            else
            {
                var scores = [];
                scores[0]=docs[i].scores[0];
                scores[1]=docs[i].scores[1];
                scores[2]=docs[i].scores[2];
                docs[i].scores = scores;
                students.save(docs[i],{safe:true},function(err){

                });
            }
        }
		var fs = require('fs');
		fs.writeFileSync('2.txt', JSON.stringify(docs,null,4));
		console.log("file done");
        db.close();
    });
});