const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

//in coursera --> using offline installed mongo db that(mongo db server) is running at this location: mongodb://localhost:27017/ 
//const url = 'mongodb://localhost:27017/';
// Here using online mongoDB(Cloud MongoDB --> MongoDB Atlas). Below is the connection string to connect to cloud MongoDB Atals like
// SQL Server connextion string
const uri = "mongodb+srv://ska95dev:icIOVfBSRB9sN7PD@cluster0-kmtym.azure.mongodb.net/conFusion?retryWrites=true&w=majority"
const dbname = "conFusion";

MongoClient.connect(uri, function(err, client) {
   if(err) { // or we can use  assert.equal(err, null);
        console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
   }
   console.log('Application Connected to MongoDB Atlas...');

   const db = client.db("conFusion")
   const collection = db.collection("dishes");
   
   collection.insertOne({"name": "Uthappizza", "description": "test"}, (err, result) => {
       assert.equal(err, null);

       console.log("After Insert:\n");
       console.log(result.ops);

       collection.find({}).toArray((err, docs) => { //find with empty json --> search for all the recors in collection
            assert.equal(err, null);
        
            console.log("Found:\n");
            console.log(docs);

            db.dropCollection("dishes", (err, result) => {
                assert.equal(err,null);

                console.log("Collection dropped");

                client.close();
        });
    });
   });
});

// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://ska95dev:icIOVfBSRB9sN7PD@cluster0-kmtym.azure.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });