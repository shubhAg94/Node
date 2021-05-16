const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operations'); 

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

   const db = client.db(dbname)

   dboper.insertDocument(db, { name: "Vadonut", description: "Test"},
        "dishes", (result) => {
            console.log("Insert Document:\n", result.ops);

            dboper.findDocuments(db, "dishes", (docs) => {
                console.log("Found Documents:\n", docs);

                dboper.updateDocument(db, { name: "Vadonut" },
                    { description: "Updated Test" }, "dishes",
                    (result) => {
                        console.log("Updated Document:\n", result.result);

                        dboper.findDocuments(db, "dishes", (docs) => {
                            console.log("Found Updated Documents:\n", docs);
                            
                            db.dropCollection("dishes", (result) => {
                                console.log("Dropped Collection: ", result);

                                client.close();
                            });
                        });
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