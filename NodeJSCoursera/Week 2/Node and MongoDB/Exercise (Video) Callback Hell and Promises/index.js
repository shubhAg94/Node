const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operations'); 

//in coursera --> using offline installed mongo db that(mongo db server) is running at this location: mongodb://localhost:27017/ 
//const url = 'mongodb://localhost:27017/';
// Here using online mongoDB(Cloud MongoDB --> MongoDB Atlas). Below is the connection string to connect to cloud MongoDB Atals like
// SQL Server connextion string
const uri = "mongodb+srv://ska95dev:icIOVfBSRB9sN7PD@cluster0-kmtym.azure.mongodb.net/conFusion?retryWrites=true&w=majority"
const dbname = "conFusion";

MongoClient.connect(uri).then((client) => {

    console.log('Connected correctly to server');
    const db = client.db(dbname);

    dboper.insertDocument(db, { name: "Vadonut", description: "Test"},
        "dishes")
        .then((result) => {
            console.log("Insert Document:\n", result.ops);

            return dboper.findDocuments(db, "dishes");
        })
        .then((docs) => {
            console.log("Found Documents:\n", docs);

            return dboper.updateDocument(db, { name: "Vadonut" },
                    { description: "Updated Test" }, "dishes");

        })
        .then((result) => {
            console.log("Updated Document:\n", result.result);

            return dboper.findDocuments(db, "dishes");
        })
        .then((docs) => {
            console.log("Found Updated Documents:\n", docs);
                            
            return db.dropCollection("dishes");
        })
        .then((result) => {
            console.log("Dropped Collection: ", result);

            return client.close();
        })
        .catch((err) => console.log(err));

})
.catch((err) => console.log(err));